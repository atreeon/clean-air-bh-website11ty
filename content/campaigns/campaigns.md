---
layout: layouts/topLevel.njk
eleventyNavigation:
  key: Campaigns
  order: 4
---

<br />

{% for item in collections.all | eleventyNavigation("Campaigns") %}
<div class="banner-link banner-information">
	<a href="{% getUrlLinkByKeySC collections.all, 'Your Councillor' %}">
{{ item.longTitle }}
	</a>
</div>
{% endfor %}

Our flyer summarises our priorities

{% externalLink "https://docs.google.com/document/d/1MB0nCFhs9pr76F2OEWS4KWoUU3lmPnKMlqbQWsMaELU/edit", "Summary Flyer" %}




