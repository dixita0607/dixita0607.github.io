---
title: Notes — Dixita Ganatra
layout: main
---
<article class="page content-list"><header class="page-header"><p class="section-label">Field notes</p><h1>Things I wanted to remember.</h1><p>Notes about development, drawing, coffee, and travelling around.</p></header><ul>{% assign notes = collections.all | reverse %}{% for note in notes %}{% if note.data.layout == "blog" %}<li><a href="{{ note.url }}">{{ note.data.title }}</a><br><small>{{ note.data.publishDate }}</small></li>{% endif %}{% endfor %}</ul></article>
