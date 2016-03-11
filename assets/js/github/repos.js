var url = 'https://api.github.com/users/' + username + '/repos?sort=created';
var mediatype = 'application/vnd.github.beta+json';
var eleroot = 'repos';

go(url,repos);

function repos(json){
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
      link.href = repolist.html_url;
      link.innerHTML = repolist.owner.login + '/<strong>' + repolist.name + '</strong>';
      var date = document.createElement('span');
      date.classList.add('date');
      date.innerHTML = '<br>' + convertDate(repolist.created_at);
      var homepage = '';
      if(repolist.homepage){
        homepage = ' <a href="' + repolist.homepage + '">' + repolist.homepage + '</a>';
      }
      span.innerHTML = '<br>' + repolist.description + homepage;
      li.appendChild(link);
      li.appendChild(span);
      li.appendChild(date);
      // ul.appendChild(li);
      // div.appendChild(li);
      document.getElementById(eleroot).appendChild(li);
    }
  }
}
