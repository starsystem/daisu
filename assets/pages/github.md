---
title: GitHub
description: GitHub API
menu: 2
permalink: github/
octicon: mark-github
---
{% assign pa = site.pages | where: 'parent', page.title | sort: 'menu' %}
{% for p in pa %}
* {% if p.octicon %}<span class="octicon octicon-{{ p.octicon }}"></span> {% endif %}[{{ p.title }}]({{ site.baseurl }}{{ p.url }})
{% endfor %}
