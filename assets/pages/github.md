---
title: GitHub
description: GitHub API
menu: 2
permalink: github/
octicon: mark-github
---
Hide this page with `menu:0`
{% assign pa = site.pages | where: 'parent', page.title | sort: 'menu' %}
{% for p in pa %}
* [{{ p.title }}]({{ p.url }})
{% endfor %}
