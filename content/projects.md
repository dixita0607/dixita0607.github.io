---
title: Work — Dixita Ganatra
layout: main
---

<article class='page content-list'>
  <header class='page-header'>
    <h1>Work.</h1>
  </header>

{% for group in projects.current %}
    <section>
      <h2>{{ group.title }}</h2>
      <p>{{ group.description }}</p>
      <ul>
        {% for project in group.projects %}
          <li>
            <a href='{{ project.code }}'>{{ project.title }}</a><br>
            {{ project.description }}
          </li>
        {% endfor %}
      </ul>
    </section>
{% endfor %}

{% for group in projects.currentContributions %}
    <section>
      <h2>{{ group.title }}</h2>
      <p>{{ group.description }}</p>
      <ul>
        {% for project in group.projects %}
          <li>
            <a href='{{ project.code }}'>{{ project.title }}</a><br>
            {{ project.description }}
          </li>
        {% endfor %}
      </ul>
    </section>
{% endfor %}

{% for group in projects.fcc %}
    <section>
      <h2>{{ group.title }}</h2>
      <p>{{ group.description }}</p>
      <ul>
        {% for project in group.projects %}
          <li>
            <a href='{{ project.code }}'>{{ project.title }}</a><br>
            {{ project.description }}
          </li>
        {% endfor %}
      </ul>
    </section>
{% endfor %}

{% for group in projects.other %}
    <section>
      <h2>{{ group.title }}</h2>
      {% if group.description %}
        <p>{{ group.description }}</p>
      {% endif %}
      <ul>
        {% for project in group.projects %}
          <li>
            <a href='{{ project.code }}'>{{ project.title }}</a><br>
            {{ project.description }}
          </li>
        {% endfor %}
      </ul>
    </section>
{% endfor %}
</article>
