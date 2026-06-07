---
title: Blog - Dixita Ganatra
layout: main
---

{% assign blogs_by_date = pages | sort_natural: "publishDate" | reverse %}

{% for page in blogs_by_date %}
{% if page.url contains "blog/" and page.url != "blog/index.md" %}

- *{{ page.publishDate }}* - [{{ page.title }}]({{ page.url }})
{% endif %}
{% endfor %}
