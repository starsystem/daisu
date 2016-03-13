var url = 'https://api.github.com/users/' + username + '/repos?sort=created';
mediatype = 'application/vnd.github.beta+json';
cb = function repos(json){
  for (var variable in json) {
    if (json.hasOwnProperty(variable)) {
      var repolist = json[variable];
      var fork = '', homepage = '';
      var li = document.createElement('li');
      var span = document.createElement('span');
      var link = document.createElement('a');
      link.href = repolist.html_url;
      // CREATE MAIN LINK
      link.innerHTML = bold(repolist.name);
      // CHECK IF FORK
      if(repolist.fork) fork = ' <span class="octicon octicon-repo-forked"></span>';
      var date = document.createElement('span');
      date.classList.add('date');
      date.innerHTML = '<br>' + convertDate(repolist.created_at);
      // CHECK HOMEPAGE LINK
      if(repolist.homepage) homepage = ' <a href="' + repolist.homepage + '">' + repolist.homepage + '</a>';
      span.innerHTML =  fork + '<br>' + repolist.description + homepage;
      li.appendChild(link);
      li.appendChild(span);
      li.appendChild(date);
      eleroot.appendChild(li);
    }
  }
};
go(url,cb);
