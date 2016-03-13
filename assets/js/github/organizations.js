var url = 'https://api.github.com/users/' + username + '/orgs';
cb = function orgs(json){
  for (var variable in json) {
    if (json.hasOwnProperty(variable)) {
      var repolist = json[variable];
      var li = document.createElement('li');
      var span = document.createElement('span');
      var link = document.createElement('a');
      link.href = 'https://github.com/' + repolist.login;
      link.innerHTML = bold(repolist.login);
      span.innerHTML = '<br>' + repolist.description;
      li.appendChild(link);
      li.appendChild(span);
      eleroot.appendChild(li);
    }
  }
};
go(url,cb);
