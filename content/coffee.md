---
title: Coffee Journal - Dixita Ganatra
layout: main
---

<article class="page content-list">
<header class="page-header"><p class="section-label">Coffee journal</p><span class="page-doodle" aria-hidden="true">☕</span><h1>Coffees I’ve tried.</h1><p>I brew with an <a href="https://aeropress.com" target="_blank" rel="noreferrer">Aeropress</a> and a metal filter. These are just my notes, not expert reviews.</p></header>

<h2>Coffee shelf</h2>

_Disclaimer: I describe what I taste in my own words, which may sound nothing like those fancy coffee reviews._

<style>
.coffee-grid {
 display: grid;
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 1.5rem;
}

@media (max-width: 860px) {
 .coffee-grid {
  grid-template-columns: 1fr;
 }
}

.coffee-card {
  padding: 1rem;
  border: 1px solid var(--content-hr);
  border-radius: 1rem;
}

</style>

<div class="coffee-grid">
{% for coffee in coffee.coffees %}
<div class="coffee-card">

#### {% if coffee.url %}<a href="{{ coffee.url }}" target="_blank" rel="noreferrer">{{ coffee.name }}</a>{% else %}{{ coffee.name }}{% endif %}

**Roaster:** {{ coffee.roasters }}  
**Origin:** {{ coffee.origin }} | **Price:** ₹{{ coffee.price }}  
**Roast Level:** {{ coffee.roast_level }} | **Beans:** {% for bean in coffee.beans %}{{ bean.Arabica }}% Arabica{% endfor %}

**My Rating:** {{ coffee.rating }}/5

**Brewing:** {% for method in coffee.brewing_method %}{% for pair in method %}{% assign key = pair[0] %}{% assign val = pair[1] %}{{ key }} ({{ val }}){% endfor %}{% if forloop.last == false %}, {% endif %}{% endfor %} | Grind: {{ coffee.grind_size }} | Water: {{ coffee.water_temperature }}°C

**Aroma:** {{ coffee.aroma }}  
**Acidity:** {{ coffee.acidity }} | **Body:** {{ coffee.body }}

**Tasting Notes:** {{ coffee.notes | join: ", " }}  
**Aftertaste:** {{ coffee.aftertaste | join: ", " }}

**My Take:** {{ coffee.note }}

**Tried on:** {{ coffee.date }}

</div>
{% endfor %}
</div>
</article>
