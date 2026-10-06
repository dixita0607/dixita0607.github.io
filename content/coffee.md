---
title: Coffee Journal - Dixita Ganatra
layout: main
---

<article class="page content-list">
<header class="page-header coffee-header">
  <h1>Coffees I’ve tried.</h1>
  <p>I brew with an <a href="https://aeropress.com/" target="_blank" rel="noreferrer">inverted Aeropress</a> and a metal filter. These are just my notes, not expert reviews.</p>
  <p>I start by adding the coffee, then bloom it with hot water for about 30 seconds. I add the remaining water and stir, close the lid, and let it brew for 1½–2 minutes—depending on the cup I’m after—before flipping and pressing.</p>
  <p><a href="https://aramse.coffee/collections/products" target="_blank" rel="noreferrer">Aaramse Coffee</a> shares excellent coffees from Indian roasteries. Highly recommended for beginners.</p>
</header>

<div class="coffee-grid">
{% assign coffees_by_date = coffee.coffees | sort: "date" | reverse %}
{% for coffee in coffees_by_date %}
<div class="coffee-card">
  <div class="coffee-card__visual">
    {% if coffee.image %}
    {% assign thumbnail = coffee.image | replace: '/assets/coffee/', '/assets/coffee/thumbnails/' %}
    <img src="{{ thumbnail }}" alt="Coffee packet for {{ coffee.name }}" loading="lazy">
    {% else %}
    <span>Packet image</span>
    <span class="coffee-card__visual-mark">☕</span>
    {% endif %}
  </div>
  <div class="coffee-card__body">
    <div class="coffee-card__heading">
      <h2>{% if coffee.url != blank %}<a href="{{ coffee.url }}" target="_blank" rel="noreferrer">{{ coffee.name }}</a>{% else %}{{ coffee.name }}{% endif %}</h2>
      {% if coffee.rating != blank %}
      <span class="coffee-card__rating">{{ coffee.rating }}/5</span>
      {% endif %}
    </div>
    <p class="coffee-card__roaster">{{ coffee.roasters }}</p>
    <dl class="coffee-card__facts">
      <div>{% if coffee.origin != blank %}<dt>Origin</dt><dd>{{ coffee.origin }}</dd>{% endif %}</div>
      <div>{% if coffee.roast_level != blank %}<dt>Roast</dt><dd>{{ coffee.roast_level }}</dd>{% endif %}</div>
      <div>{% if coffee.price != blank %}<dt>Price</dt><dd>₹{{ coffee.price }}</dd>{% endif %}</div>
    </dl>
    {% if coffee.date != blank %}
    <p class="coffee-card__date">Tried {{ coffee.date }}</p>
    {% endif %}
    {% if coffee.note != blank %}
    <p class="coffee-card__note"><span>Personal note</span>{{ coffee.note }}</p>
    {% endif %}
    {% if coffee.aftertaste != blank %}
    <p class="coffee-card__note"><span>Aftertaste</span>{{ coffee.aftertaste | join: ", " }}</p>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>
</article>
