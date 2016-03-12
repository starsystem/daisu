var path = window.location.host.split( '.' );
var username = path[0];

function go(url,cb){
  var xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState === 4) {
      if (xhrObject.status === 200 || xhrObject.status === 304) {
        var response = xhrObject.responseText;
        var json = JSON.parse(response);
        cb(json);
        // PAGINATION
        var headerLink = xhrObject.getResponseHeader('Link');
        if(headerLink){
          var pagers = headerLink.split(', ');
          for (var i in pagers) {
            var arr = pagers[i].split('; ');
            var reg = /rel="(.*?)"/g;
            var exp = reg.exec(arr[1]);
            var text = exp[1];
            reg = /<(.*?)>/g;
            exp = reg.exec(arr[0]);
            var link = exp[1];
            var pag = document.createElement('a');
            pag.href='#top';
            pag.setAttribute('data-link', link);
            pag.innerHTML = text.charAt(0).toUpperCase() + text.slice(1);
            // pag.addEventListener('click',go(link,cb),false);
            document.querySelector("section nav").appendChild(pag);
          }
        }
        // RATE LIMIT
        var elerate = document.createElement('h2');
        elerate.innerHTML = 'X-RateLimit-Remaining ' + xhrObject.getResponseHeader('X-RateLimit-Remaining');
        document.getElementById('rate').innerHTML = 'X-RateLimit-Remaining ' + xhrObject.getResponseHeader('X-RateLimit-Remaining');
        // referenceNode = document.getElementById(eleroot);
        // referenceNode.parentNode.insertBefore(elerate, referenceNode.nextSibling);
      }
    }
  };
  xhrObject.open(
    "GET",
    url,
    true
  );
  xhrObject.setRequestHeader( 'Accept', mediatype );
  xhrObject.send();
}

function convertDate(isoDate){
  var newDate = new Date(isoDate);
  var options = {
    month: "long",
    year: "numeric"
  };
  var optionsDay = {
    day: "numeric"
  };
  var string = newDate.toLocaleDateString('en-US',optionsDay) + ' ' + newDate.toLocaleDateString('en-US',options);
  return string;
}
