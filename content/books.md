---
title: Books - Dixita Ganatra
layout: main
---

# Books

A running log of what I'm reading now and everything I've finished, grouped by year.

## Currently Reading

{% for book in books.reading %}

- **{{ book.title }}** — *{{ book.author }}*{% if book.started %} (Started: {{ book.started }}{% if book.completed %}; Completed: {{ book.completed }}{% endif %}){% endif %}
{% endfor %}

## Read

{% for year_books in books.read %}
{% assign year = year_books[0] %}
{% assign year_book_list = year_books[1] %}

### {{ year }}

{% for book in year_book_list %}

- **{{ book.title }}** — *{{ book.author }}*{% if book.completed or book.started %} (Finished: {{ book.completed | default: 'NA' }}{% if book.started %}; Started: {{ book.started }}{% endif %}){% endif %}
{% endfor %}
{% endfor %}
