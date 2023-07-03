---
layout: layouts/campaigns.njk
eleventyNavigation:
  key: Campaigns
  longTitle: Let's Clean Up The Air - Our Campaigns
  order: 4
---

<h2><a href="#id-our-campaigns">Our Campaigns</a></h2>

<div class="our-vision">
	Air pollution is a public health crisis and our elected representatives are not doing enough to tackle it.
	Polluted air is linked to asthma, heart disease, strokes, dementia, diabetes, cancer and reduced life expectancy.
	<br /><br />
	Air pollution is particularly harmful to children and babies.  It can cause asthma, stunt lung growth and reduce life expectancy.
	<br /><br />
	It is the top environmental risk to human health in the UK.
	Brighton & Hove has some of the UKs most polluted roads and, due to a lack of regulation, we are one of the least protected in the UK.
	<br /><br />
	The red on the map shows illegal levels of pollution.
	<br /><br />
	We are campaigning for clean air for everyone, please join us.
	<br /><br />
	<img src="{{ '/img/CentralBrighton_NO2.jpg' | url }}" />
</div>

<h2 id="id-our-campaigns">Our Campaigns</h2>

{% for item in collections.all | eleventyNavigation("Campaigns") %}
<div class="banner-link banner-information">
	<a href="{% getUrlLinkByKeySC collections.all, item.key %}">
{{ item.longTitle }}
	</a>
</div>
{% endfor %}

Our flyer summarises our priorities

{% externalLink "https://docs.google.com/document/d/1MB0nCFhs9pr76F2OEWS4KWoUU3lmPnKMlqbQWsMaELU/edit", "Summary Flyer" %}




