var path = window.location.host.split( '.' );
var username = path[0];
var url = 'https://api.github.com/users/petrosh/watched';

go(url);
function go(url){
  var xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState === 4) {
      if (xhrObject.status === 200 || xhrObject.status === 304) {
        var response = xhrObject.responseText;
        var json = JSON.parse(response);
        // console.log(json);
        for (var variable in json) {
          if (json.hasOwnProperty(variable)) {
            var repolist = json[variable].repo;
            var starred = json[variable].starred_at;
            console.log(starred);
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
            document.getElementById('stars').appendChild(li);
          }
        }
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
      }
    }
  };
  xhrObject.open(
    "GET",
    url,
    true
  );
  xhrObject.setRequestHeader( 'Accept', 'application/vnd.github.star+json' );
  xhrObject.send();
}
