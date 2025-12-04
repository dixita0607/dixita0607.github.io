---
title: Projects - Dixita Ganatra
layout: main
---

# Projects

{% for collection in projects.current %}

## {{ collection.title }}

{% if collection.description %}
{{ collection.description }}
{% endif %}

{% for project in collection.projects %}

- [**{{ project.title }}**]({{ project.code }}): {{ project.description }}
{% endfor %}
{% endfor %}

{% for collection in projects.currentContributions %}

## {{ collection.title }}

{% if collection.description %}
{{ collection.description }}
{% endif %}

{% for project in collection.projects %}

- [**{{ project.title }}**]({{ project.code }}): {{ project.description }}
{% endfor %}
{% endfor %}

{% for collection in projects.fcc %}

## {{ collection.title }}

{% if collection.description %}
{{ collection.description }}
{% endif %}

{% for project in collection.projects %}

- [**{{ project.title }}**]({{ project.code }}): {{ project.description }}
{% endfor %}
{% endfor %}

{% for collection in projects.other %}

## {{ collection.title }}

{% for project in collection.projects %}

- [**{{ project.title }}**]({{ project.code }}): {{ project.description }}
{% endfor %}
{% endfor %}
