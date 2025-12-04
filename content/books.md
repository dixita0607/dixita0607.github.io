---
title: Books - Dixita Ganatra
layout: main
---

# Books

## Currently Reading

{% for book in books.reading %}

- **{{ book.title }}** by *{{ book.author }}*{% if book.started %} (Started: {{ book.started }}{% if book.completed %}, Completed: {{ book.completed }}{% endif %}){% endif %}
{% endfor %}

## Read

{% for year_books in books.read %}
{% assign year = year_books[0] %}
{% assign year_book_list = year_books[1] %}

### {{ year }}

{% for book in year_book_list %}

- **{{ book.title }}** by *{{ book.author }}*{% if book.started %} (Started: {{ book.started }}{% if book.completed %}, Completed: {{ book.completed }}{% endif %}){% endif %}
{% endfor %}
{% endfor %}
