var url = 'https://api.github.com/users/' + username + '/gists';
var mediatype = 'application/vnd.github.full+json';
var eleroot = 'gists';

go(url,gists);

function gists(json){
  for (var variable in json) {
    if (json.hasOwnProperty(variable)) {
      // GET GISTS
      var repolist = json[variable];
      // PREPARE ELEMENT
      var li = document.createElement('li');
      // FILE LOOP
      var lista = repolist.files;
      var j = 1;
      for (var f in lista) {
        // CREATE LINK
        var link = document.createElement('a');
        // GET URL
        var filelink = lista[f].filename;
        filelink = filelink.toLowerCase();
        // REPLACE DOTS AND SPACES WIDTH DASH
        var fname = filelink.replace(/\.| /g, '-');
        fname = fname.replace(/^-/g, '');
        link.href = repolist.html_url;
        // ADD FILE ANCHOR
        if(j!==1)link.href+='#file-' + fname;
        link.innerHTML = lista[f].filename;
        // ADD SEPARATOR
        var span = document.createElement('span');
        span.innerHTML = ' / ';
        // APPEND GIST ITEM
        li.appendChild(link);
        if(j !== Object.keys(lista).length) li.appendChild(span);
        j++;
      }
      // DESCRIPTION
      var desc = document.createElement('span');
      desc.innerHTML = '<br>' + repolist.description;
      li.appendChild(desc);
      // ADD TO PAGE
      document.getElementById(eleroot).appendChild(li);
    }
  }
}
