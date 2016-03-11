var url = 'https://api.github.com/users/' + username + '/orgs';
var mediatype = 'application/vnd.github.full+json';
var eleroot = 'orgs';

go(url,orgs);

function orgs(json){
  for (var variable in json) {
    if (json.hasOwnProperty(variable)) {
      var repolist = json[variable];
      // var div = document.createElement('div');
      // var img = document.createElement('img');
      // img.src = repolist.owner.avatar_url;
      // var ul = document.createElement('ul');
      var li = document.createElement('li');
      var span = document.createElement('span');
      var link = document.createElement('a');
      link.href = repolist.url;
      link.innerHTML = username + '/<strong>' + repolist.login + '</strong>';
      // var date = document.createElement('em');
      // date.innerHTML = '<br>' + repolist.created_at;
      // var homepage = '';
      // if(repolist.homepage){
      //   homepage = ' <a href="' + repolist.homepage + '">' + repolist.homepage + '</a>';
      // }
      span.innerHTML = '<br>' + repolist.description;
      li.appendChild(link);
      li.appendChild(span);
      // li.appendChild(date);
      // ul.appendChild(li);
      // div.appendChild(li);
      document.getElementById(eleroot).appendChild(li);
    }
  }
}
