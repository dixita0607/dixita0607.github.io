---
title: Coffee Journal - Dixita Ganatra
layout: main
---

# Coffee Journal

I use an <a href="https://aeropress.com" target="_blank" rel="noreferrer">Aeropress</a> with a metal filter. My go-to websites for recipes are <a href="https://aeroprecipe.com" target="_blank" rel="noreferrer">aeroprecipe</a> and <a href="https://aeromatic.app" target="_blank" rel="noreferrer">aeromatic</a>. Initially, I subscribed to <a href="https://aramse.coffee" target="_blank" rel="noreferrer">Aaramse</a> and got some great coffees.

### Coffees I've tried

_Disclaimer: I describe what I taste in my own words, which may sound nothing like those fancy coffee reviews._

---

{% for coffee in coffee.coffees %}

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

---
{% endfor %}
