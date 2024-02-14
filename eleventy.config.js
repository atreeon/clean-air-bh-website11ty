const {DateTime} = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const nunjucks = require("nunjucks");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const {EleventyHtmlBasePlugin} = require("@11ty/eleventy");

const formatItem = function (item, key) {
	return {
		key: item?.data?.eleventyNavigation?.key ?? null,
		title: item?.data?.eleventyNavigation?.title ?? item?.data?.eleventyNavigation?.key ?? null,
		url: item?.data?.page?.url ?? null,
		parent: item?.data?.eleventyNavigation?.parent ?? null,
		isKeyParent: (item?.data?.eleventyNavigation?.parent ?? null) == key
	};
}

const getParents = function (collections, key, parents) {
	let currentItem = getItemByKey(collections, key);

	if (currentItem == undefined) {
		return parents;
	}

	if (currentItem.parent != null) {
		parents.push(currentItem.parent);
		parents = getParents(collections, currentItem.parent, parents);
	}

	return parents;


	//get current item
	//	do we have a parent item?
	//		yes: add the parent item
}

const getTopLevel = function (collections) {
	//as long as they don't have a parent
	let items = collections.map(function (item) {
		return formatItem(item);
	}).filter(function (item) {
		if (item.parent == null && item.key != null) {
			return true;
		}

		return false
	});

	return items;
}
const getChildren = function (collections, key) {
	let children = collections.filter(function (item) {
		if (item.data &&
			item.data.eleventyNavigation &&
			item.data.eleventyNavigation.parent &&
			item.data.eleventyNavigation.parent == key
		) {
			return true;
		} else {
			return false;
		}
	}).map(function (item) {
		return formatItem(item);
	});

	return children;
}
const getCurrentItemFromCollection = function (collections, url) {
	let currentItem = collections.find(function (item) {
		if (item.data &&
			item.data.eleventyNavigation &&
			item.data.page &&
			item.data.page.url &&
			item.data.page.url == url
		) {
			return true;
		} else {
			return false;
		}
	});

	return formatItem(currentItem);
};

const getItemByKey = function (collections, key) {
	let currentItem = collections.find(function (item) {
		if (item.data &&
			item.data.eleventyNavigation &&
			item.data.eleventyNavigation.key &&
			item.data.eleventyNavigation.key == key
		) {
			return true;
		} else {
			return false;
		}
	});

	if (currentItem == undefined) {
		return undefined;
	}

	return formatItem(currentItem);
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode(
		'registerForUpdates',
		() => {
			// return '' +
			// 	'<script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/embed/v2.js"></script>\n' +
			// 	'<script>\n' +
			// 	'  hbspt.forms.create({\n' +
			// 	'    region: "eu1",\n' +
			// 	'    portalId: "26983154",\n' +
			// 	'    formId: "3834414a-a78e-4236-80fd-ee7d90d68e94"\n' +
			// 	'  });\n' +
			// 	'\n' +
			// 	'</script>';

			return '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSer90QC5GaNQxENy2w1x0t0eIAAdOl_kq71jG0IqPsirot69A/viewform?embedded=true" width="640" height="1150" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>';
		}
	);

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});

	eleventyConfig.addPassthroughCopy("public");
	eleventyConfig.addPassthroughCopy("CNAME");
	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("aq_charts");

//delete comment
	// eleventyConfig.addPassthroughCopy("assets", {
	// return {
	// 	dir: {
	// 		input: "src",
	// 		output: "www",
	// 	}
	// }});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(require("./eleventy.config.drafts.js"));
	eleventyConfig.addPlugin(require("./eleventy.config.images.js"));

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: {tabindex: 0}
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters
	// eleventyConfig.addFilter('getLinkByKey', function(key, collections) {
	// 	return key.toString();
	// });

	// eleventyConfig.addShortcode(
	// 	'blah0',
	// 	() => {
	// 		return "blah0";
	// 	});

	eleventyConfig.addShortcode(
		'getParentLinks',
		(collections, key) => {
			let findParentKey = collections.find(function (item) {
				if (item.data &&
					item.data.eleventyNavigation &&
					item.data.eleventyNavigation.key &&
					item.data.eleventyNavigation.key == key
				) {
					return true;
				} else {
					return false;
				}
			});
		});

	eleventyConfig.addFilter("render", (content) => {
		const env = new nunjucks.Environment();
		return nunjucks.renderString(content, env.getTemplate.bind(env));
	});

	eleventyConfig.addFilter("getItemByKey", function (collections, key) {
		return getItemByKey(collections, key);
	});

	eleventyConfig.addFilter("getParents", function (collections, key) {
		return getParents(collections, key, []);
	});

	eleventyConfig.addFilter("getTopLevel", function (collections) {
		return getTopLevel(collections);
	});

	eleventyConfig.addFilter("getCurrentItem", function (collections, url) {
		let currentItem = getCurrentItemFromCollection(collections, url);
		return currentItem;
	});

	eleventyConfig.addFilter("containsParent", function (parentList, key) {
		return parentList.includes(key);
	});

	eleventyConfig.addFilter("getChildren", function (collections, key) {
		let children = getChildren(collections, key);
		return children;
	});

	eleventyConfig.addFilter("formatAllItems", function (collections, key) {
		return collections.map(function (item) {
			return formatItem(item, key);
		});
	});


	eleventyConfig.addFilter("findItemByUrl", function (collections, url) {
		/*
		has children
			write out the children menu bar
		has siblings
			write out the current menu bar
				select this current
		has parent
			write out the parent with the selected
				keep looping recursively until false
		 */

		//has children
		//  find current
		let currentItem = collections.find(function (item) {
			if (item.data &&
				item.data.eleventyNavigation &&
				item.data.page &&
				item.data.page.url &&
				item.data.page.url == url
			) {
				return true;
			} else {
				return false;
			}
		});

		if (currentItem == undefined) {
			return '!!!not found current!!!';
		}

		//get key
		let currentKey = currentItem.data.eleventyNavigation.key;

		//get children
		let children = collections.filter(function (item) {
			if (item.data &&
				item.data.eleventyNavigation &&
				item.data.page &&
				item.data.page.parent &&
				item.data.page.parent == currentKey
			) {
				return true;
			} else {
				return false;
			}
		});

		return children;
	});


	eleventyConfig.addShortcode(
		'externalLink',
		(url, text) => {
			return "<a href='" + url + "' target='_blank'>" + text ?? url + "</a>";
		}
	)

	eleventyConfig.addShortcode(
		'getLongTitleLinkByKeySC',
		(collections, key) => {
			let findResult = collections.find(function (item) {
				if (item.data &&
					item.data.eleventyNavigation &&
					item.data.eleventyNavigation.key &&
					item.data.eleventyNavigation.key == key
				) {
					return true;
				} else {
					return false;
				}
			});

			if (findResult != undefined) {
				let nav = findResult.data.eleventyNavigation;

				let longTitle = nav.longTitle || findResult.data.page.longTitle;

				if (longTitle != undefined) {
					return "<h1>" + longTitle + "</h1>";
				} else {
					return "";
				}
			}

			return "!!!" + key + " navigation entry not found!!!";
		})

	eleventyConfig.addShortcode(
		'getUrlLinkByKeySC',
		(collections, key) => {
			let findResult = collections.find(function (item) {
				if (item.data &&
					item.data.eleventyNavigation &&
					item.data.eleventyNavigation.key &&
					item.data.eleventyNavigation.key == key
				) {
					return true;
				} else {
					return false;
				}
			});

			if (findResult != undefined) {
				let nav = findResult.data.eleventyNavigation;
				nav.title = nav.title || findResult.data.page.title || nav.key;
				nav.url = nav.url || findResult.data.page.url;

				return nav.url;
			}

			return "!!!" + key + " navigation entry not found!!!";
		});

	eleventyConfig.addShortcode(
		'getLinkByKeySC',
		(collections, key) => {
			let findResult = collections.find(function (item) {
				if (item.data &&
					item.data.eleventyNavigation &&
					item.data.eleventyNavigation.key &&
					item.data.eleventyNavigation.key == key
				) {
					return true;
				} else {
					return false;
				}
			});

			if (findResult != undefined) {
				let nav = findResult.data.eleventyNavigation;
				nav.title = nav.title || findResult.data.page.title || nav.key;
				nav.url = nav.url || findResult.data.page.url;

				return "<a href='" + nav.url + "'>" + nav.title + "</a>";
			}

			return "!!!" + key + " navigation entry not found!!!";
		});

	eleventyConfig.addFilter("getAuthor", (authors, label) => {
		let author = authors.filter(a => a.key === label)[0];
		return author;
	});

	eleventyConfig.addFilter("getListOfNavigations", function (collections, key) {
		return collections.filter(function (item) {
			if (item.data && item.data.eleventyNavigation) {
				return true;
			} else {
				return false;
			}
		}).map(function (item) {
			let nav = item.data.eleventyNavigation;
			return nav.title || item.data.page.title || nav.key;
		});

		// return collections.map(function(item){
		// 	item.data = item.data || {};
		// 	item.data.tags = item.data.tags || '';
		// 	return item.data.tags;
		//
		// });

		// return collections.filter(function (item) {
		// 	if(item == null){
		// 		return false;
		// 	}
		//
		// 	if(item.hasOwnProperty("data")){
		// 		if()
		// 	}
		// });

		// return collections.filter(function(item){
		//
		//
		// 	return item.data.tags.contains(["nav"]);
		// });

		// return collections[0].data.tags.includes("posts");

		// return collections.filter(function (item) {
		// 	if (item.data != null && item.data.tags != null) {
		// 		return item.data.tags.includes(["posts"]);
		// 	}
		// 	return "";
		// }).toString();

		// 	.map(function(item){
		// 	return item.toString();
		// }).toString();
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, {zone: zone || "utc"}).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1, 2, 3, 4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid"
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",         // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "_site"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
