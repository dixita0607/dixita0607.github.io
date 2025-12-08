---
title: Blog - Dixita Ganatra
layout: main
---

# Blog

{% assign blogs_by_date = pages | sort_natural: "date" | reverse %}

{% for page in blogs_by_date %}
{% if page.url contains "blog/" and page.url != "blog/index.md" %}

- *{{ page.date }}* - [{{ page.title }}]({{ page.url }})
{% endif %}
{% endfor %}
