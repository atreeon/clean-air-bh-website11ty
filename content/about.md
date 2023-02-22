---
layout: layouts/base.njk
eleventyNavigation:
  key: About
  title: Abouty
  order: 5
---

Use the {% getLinkByKeySC collections.all, "Register" %} link to subscribe to future
news and information.  Once subscribed we will send email alerts telling you if we
have a meeting and if we need your help.  We need a band of helpful caring clean air
campaigners.

<div>
  <h2>Email Us</h2>
	<p>{{ metadata.email }}</p>
	<a href="mailto:{{ metadata.email }}">Open Your Email Client</a>
</div>

<div>
  <h2>Twitter</h2>
	<a href="{{ metadata.twitterUrl }}" target="_blank">{{ metadata.twitterUrl }}</a>
</div>
