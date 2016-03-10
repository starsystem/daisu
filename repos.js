var path = window.location.host.split( '.' );
var username = path[0];
var page = 1;
var url = 'https://api.github.com/users/' + username + '/repos?page=' + page;
go(url);
function go(url){
  var xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState === 4) {
      if (xhrObject.status === 200 || xhrObject.status === 304) {
        var response = xhrObject.responseText;
        var json = JSON.parse(response);
        console.log(xhrObject.getResponseHeader('Link'));
        for (var r in json) {
          var p = document.createElement('p');
          var strong = document.createElement('strong');
          strong.innerHTML = json[r].full_name + '<br>';
          var span = document.createElement('span');
          span.innerHTML = '<br>' + json[r].description;
          var link = document.createElement('a');
          link.href = json[r].html_url;
          link.innerHTML = json[r].html_url;
          p.appendChild(strong);
          p.appendChild(link);
          p.appendChild(span);
          document.getElementById('stars').appendChild(p);
        }
        if(response != '[]' && page<3){
          page++;
          go(url);
        }
      }
    }
  };
  xhrObject.open(
    "GET",
    url,
    true
  );
  xhrObject.setRequestHeader( 'Accept', 'application/vnd.github.beta+json' );
  xhrObject.send();
}
