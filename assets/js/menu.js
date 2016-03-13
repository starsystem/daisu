// GET METADATA
var path = window.location.host.split( '.' );
var username = path[0];//, username = 'petrosh'
var perm = document.getElementById('permalink').getAttribute('href');
var githubUrl = document.getElementById('githubUrl').getAttribute('href');
var githubRepository = document.getElementById('githubRepository').getAttribute('href');//, githubRepository = 'petrosh.github.io'

// Link active class on menu
var listItems = document.querySelectorAll("header nav a");
for (var variable in listItems) {
  if (listItems.hasOwnProperty(variable)) {
    if( listItems[variable].getAttribute('href') == perm ){
      var ele = listItems[variable];
      ele.classList.add('live');
    }
  }
}
