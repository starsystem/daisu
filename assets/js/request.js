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
            if( arr[1].indexOf('next') > -1 ){
              var reg = /<(.*?)>/g;
              var exp = reg.exec(arr[0]);
              console.log("next "+exp[1]);
              //go(exp[1],cb);
            }
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
