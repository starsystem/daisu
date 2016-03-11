var path = window.location.host.split( '.' );
var username = path[0];
var url = 'https://api.github.com/users/' + username + '/gists';

go(url);
function go(url){
  var xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState === 4) {
      if (xhrObject.status === 200 || xhrObject.status === 304) {
        var response = xhrObject.responseText;
        var json = JSON.parse(response);
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
              var fname = filelink.replace('.', '-');
              link.href = repolist.html_url + '#file-' + fname;
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
            document.getElementById('gists').appendChild(li);
          }
        }
        // PAGINATION
        var headerLink = xhrObject.getResponseHeader('Link');
        if(headerLink){
          var pagers = headerLink.split(', ');
          for (var i in pagers) {
            var arr = pagers[i].split('; ');
            if( arr[1].indexOf('next') > -1 ){
              var reg = /<(.*?)>/g;
              var exp = reg.exec(arr[0]);
              console.log("next "+exp[1]);
              //go(exp[1]);
            }
          }
        }
        // RATE LIMIT
        var elerate = document.createElement('h2');
        elerate.innerHTML = 'X-RateLimit-Remaining ' + xhrObject.getResponseHeader('X-RateLimit-Remaining');
        referenceNode = document.getElementById('gists');
        referenceNode.parentNode.insertBefore(elerate, referenceNode.nextSibling);
      }
    }
  };
  xhrObject.open(
    "GET",
    url,
    true
  );
  xhrObject.setRequestHeader( 'Accept', 'application/vnd.github.full+json' );
  xhrObject.send();
}
