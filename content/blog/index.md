---
title: Notes — Dixita Ganatra
layout: main
---
{% assign notes = collections.all | reverse %}
{% assign blogTags = "" | split: "" %}
{% for note in notes %}{% if note.data.layout == "blog" %}{% assign blogTags = blogTags | concat: note.data.tags %}{% endif %}{% endfor %}
{% assign blogTags = blogTags | uniq | sort %}
<article class="page content-list"><header class="page-header"><h1>Blog.</h1></header><nav class="blog-filters" aria-label="Filter posts by tag"><button class="blog-filter is-active" type="button" data-filter="all" aria-pressed="true">All</button>{% for tag in blogTags %}<button class="blog-filter" type="button" data-filter="{{ tag | slugify }}" aria-pressed="false">{{ tag }}</button>{% endfor %}</nav><ul class="blog-list">{% for note in notes %}{% if note.data.layout == "blog" %}<li data-tags="{% for tag in note.data.tags %}{{ tag | slugify }} {% endfor %}"><div class="blog-list-item"><a href="{{ note.url }}">{{ note.data.title }}</a><time datetime="{{ note.data.publishDate | date: '%Y-%m-%d' }}">{{ note.data.publishDate | date: '%B %-d, %Y' }}</time></div></li>{% endif %}{% endfor %}</ul></article>
