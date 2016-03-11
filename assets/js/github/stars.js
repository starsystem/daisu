var url = 'https://api.github.com/users/' + username + '/watched';
var mediatype = 'application/vnd.github.star+json';
var eleroot = 'stars';

go(url,stars);

function stars(json){
  for (var variable in json) {
    if (json.hasOwnProperty(variable)) {
      var repolist = json[variable].repo;
      var starred = json[variable].starred_at;
      // var div = document.createElement('div');
      // var img = document.createElement('img');
      // img.src = repolist.owner.avatar_url;
      // var ul = document.createElement('ul');
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.innerHTML = '<br>' + repolist.description;
      var link = document.createElement('a');
      link.href = repolist.html_url;
      link.innerHTML = repolist.owner.login + '/<strong>' + repolist.name + '</strong>';
      var date = document.createElement('em');
      date.innerHTML = '<br>' + starred;
      li.appendChild(link);
      li.appendChild(span);
      li.appendChild(date);
      // ul.appendChild(li);
      // div.appendChild(li);
      document.getElementById(eleroot).appendChild(li);
    }
  }
}
