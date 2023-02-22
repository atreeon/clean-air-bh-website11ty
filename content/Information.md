---
layout: layouts/base.njk
eleventyNavigation:
  key: Information
  order: 4
---

This is a list of helpful information.



{% set currentItem = collections.all | getCurrentItem(page.url) %}
CurrentKey = {{ currentItem.key }}


Top Level Items:
{% set topItems = collections.all | getTopLevel %}
{%- for item in topItems %}
{{ item.key }} {{ item.title }}
{%- endfor %}



All Items:
{% set allItems = collections.all | formatAllItems(currentItem.key) %}
{%- for item in allItems %}
({{ item.key }}, {{ item.key != null }}, {{ item.parent }}, {{ item.parent == null }})
{%- endfor %}

All Children:
{% set children = collections.all | getChildren(currentItem.key) %}
{%- for item in children %}
{{ item.key }}
{%- endfor %}

{ % set navPages = collections.all | eleventyNavigation("xyz") % }
<ul>
{ %- for entry in navPages % }
  <li{ % if entry.url == page.url % } class="my-active-class"{ % endif % }>
    <a href="{ { entry.url } }">{ { entry.title } }</a>
  </li>
{ %- endfor % }
</ul>


