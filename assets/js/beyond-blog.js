// URL
var host = window.location.host;
var pathArray = host.split( '.' ); // pathArray[0]
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
// var pathHash = window.location.hash.substring( 1 ); // Drop #
var username = pathArray[0];
var reponame = pathSlash[1] || pathSlash[0];
if (username==='127') username = 'petrosh';


// REQUEST
var cb, url, thisRepository;
var mediatype = 'application/vnd.github.v3.full+json';

window.onload = function(){
  // GET METADATA
  var perm = document.getElementById('permalink').getAttribute('href');
  var githubUrl = document.getElementById('githubUrl').getAttribute('href');
  var githubRepository = document.getElementById('githubRepository').getAttribute('href');

  if(githubRepository==='') githubRepository = 'petrosh.github.io';

  var pagePath = document.getElementById('pagePath').getAttribute('href');
  var elepag = document.querySelector("section nav");

  // Link active class on menu
  var listItems = document.querySelectorAll("header nav a");
  for (var variable in listItems) {
    if (listItems.hasOwnProperty(variable)) {
      console.log(listItems[variable].getAttribute('href'),perm);
      if( listItems[variable].getAttribute('href') == perm ){
        var ele = listItems[variable];
        ele.classList.add('live');
      }
    }
  }

  // OWNER OR GUEST
  if ( localStorage.getItem( 'beyond-blog.thisRepository' ) ){
    thisRepository = atob( localStorage.getItem( 'beyond-blog.thisRepository' ) );
  }else{
    url = 'https://api.github.com/repos/' + username + '/' + githubRepository;
    cb = function(thisRepository){
      localStorage.setItem( 'beyond-blog.thisRepository', btoa( JSON.stringify(thisRepository) ) );
    };
    go(url,cb);
  }
};

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
  document.getElementById('root').innerHTML = '';
  document.querySelector('nav.paginator').remove();
  var link = this.href;
  go(link,cb);
}

function bold(string){
  return '<strong>' + string + '</strong>';
}
