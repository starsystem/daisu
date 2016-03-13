---
title: Blog
description: Recent posts
permalink: blog/
menu: 1
octicon: book
---
{% for p in site.posts %}
* [{{ p.title }}]({{ p.url }}) - {{ p.date | date_to_long_string }}
{% endfor %}
