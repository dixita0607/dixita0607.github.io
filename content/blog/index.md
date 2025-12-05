---
title: Blog
layout: main
---

# Blog

{% for page in pages %}
{% if page.url contains "blog/" and page.url != "blog/index.md" %}

- [{{ page.title }}]({{ page.url }}) - *{{ page.date }}*
{% endif %}
{% endfor %}
