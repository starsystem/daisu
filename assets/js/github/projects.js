var url = 'https://api.github.com/repos/' + username + '/' + githubRepository + '/labels';
cb = function issues(json){
  for (var variable in json) {
    if (json.hasOwnProperty(variable)) {
      console.log(json[variable]);
      // {url: "https://api.github.com/repos/petrosh/petrosh.github.io/labels/bug", name: "bug", color: "fc2929"}
      // var repolist = json[variable].repo;
      // var starred = json[variable].starred_at;
      // var li = document.createElement('li');
      // var span = document.createElement('span');
      // span.innerHTML = '<br>' + repolist.description;
      // var link = document.createElement('a');
      // link.href = repolist.html_url;
      // link.innerHTML = repolist.owner.login + '/<strong>' + repolist.name + '</strong>';
      // var date = document.createElement('span');
      // date.classList.add('date');
      // date.innerHTML = '<br>' + convertDate(starred);
      // li.appendChild(link);
      // li.appendChild(span);
      // li.appendChild(date);
      // eleroot.appendChild(li);
    }
  }
};
go(url,cb);
