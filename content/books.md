---
title: Books - Dixita Ganatra
layout: main
---

<article class="page content-list">
<header class="page-header"><h1>Books.</h1></header>

## Currently Reading

<ul class="book-list">
{% for book in books.reading %}<li><div class="book-list-item"><strong>{{ book.title }}</strong><span>{{ book.author }}</span></div></li>{% endfor %}
</ul>

## Read

<ul class="book-list">
{% assign read_years = books.read | entriesByNewestYear %}{% for year_books in read_years %}{% assign year_book_list = year_books[1] %}{% for book in year_book_list %}<li><div class="book-list-item">{% if book.link %}<a href="{{ book.link }}" target="_blank" rel="noreferrer">{{ book.title }}</a>{% else %}<strong>{{ book.title }}</strong>{% endif %}<span>{{ book.author }}</span></div></li>{% endfor %}{% endfor %}
</ul>
</article>
