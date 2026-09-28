---
title: Sketchbook — Dixita Ganatra
layout: main
---
{% assign sketchTags = "" | split: "" %}
{% for artwork in images %}{% assign sketchTags = sketchTags | concat: artwork.tags %}{% endfor %}
{% assign sketchTags = sketchTags | uniq | sort %}
<article class="page sketchbook-page">
  <header class="page-header"><h1>Sketchbook.</h1><p>Some selected pieces from my sketchbook.</p></header>
  <nav class="blog-filters sketch-filters" aria-label="Filter sketchbook by tag">
    <button class="blog-filter is-active" type="button" data-filter="all" aria-pressed="true">All</button>
    {% for tag in sketchTags %}<button class="blog-filter" type="button" data-filter="{{ tag | slugify }}" aria-pressed="false">{{ tag }}</button>{% endfor %}
  </nav>
  <div class="sketch-grid">{% for tag in sketchTags %}{% for artwork in images %}{% if artwork.tags contains tag %}
      <figure class="sketch-tile" data-title="{{ artwork.name }}" data-tags="{% for artworkTag in artwork.tags %}{{ artworkTag | slugify }} {% endfor %}">
        <img src="{{ artwork.image }}" alt="{{ artwork.alt }}">
      </figure>{% endif %}{% endfor %}{% endfor %}</div>
  <dialog class="sketch-lightbox" aria-label="Artwork preview">
    <div class="sketch-lightbox__frame">
      <button class="sketch-lightbox__close" type="button" aria-label="Close preview">×</button>
      <button class="sketch-lightbox__previous" type="button" aria-label="Previous artwork">←</button>
      <figure><img src="" alt=""><figcaption></figcaption></figure>
      <button class="sketch-lightbox__next" type="button" aria-label="Next artwork">→</button>
    </div>
  </dialog>
</article>
