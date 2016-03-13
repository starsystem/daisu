var cb;
var eleroot = document.getElementById('root');
var elepag = document.querySelector("section nav");
var mediatype = 'application/vnd.github.full+json';

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
          pagers.reverse();
          var section = document.querySelector('section');
          var nav = document.createElement('nav');
          nav.classList.add('paginator');
          for (var i in pagers) {
            var arr = pagers[i].split('; ');
            // GET REL
            var reg = /rel="(.*?)"/g;
            var exp = reg.exec(arr[1]);
            var text = exp[1];
            // GET PAGE
            reg = /page=(.*?)>/g;
            exp = reg.exec(arr[0]);
            var pagina = exp[1];
            // GET LINK
            reg = /<(.*?)>/g;
            exp = reg.exec(arr[0]);
            var link = exp[1];
            var pag = document.createElement('a');
            pag.href=link;
            // SET ATTRIBUTES AND TEXT
            pag.setAttribute('rel', text);
            pag.setAttribute('page', pagina);
            pag.innerHTML = text.charAt(0).toUpperCase() + text.slice(1) + ' ' + pagina;
            pag.addEventListener('click',reload,false);
            nav.appendChild(pag);
          }
          section.appendChild(nav);
        }
        // RATE LIMIT
        if(xhrObject.getResponseHeader('X-RateLimit-Remaining')) document.getElementById('rate').innerHTML = 'X-RateLimit-Remaining ' + xhrObject.getResponseHeader('X-RateLimit-Remaining');
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

function reload(){
  event.preventDefault();
  location.hash = this.getAttribute('page');
  // get pagination link
  eleroot.innerHTML = '';
  document.querySelector('nav.paginator').remove();
  var link = this.href;
  go(link,cb);
}

function bold(string){
  return '<strong>' + string + '</strong>';
}
