// Link active class on menu
var perm = document.getElementById('permalink').getAttribute('href');
var listItems = document.querySelectorAll("header nav a");
for (var variable in listItems) {
  if (listItems.hasOwnProperty(variable)) {
    if( listItems[variable].getAttribute('href') == perm ){
      var ele = listItems[variable];
      ele.classList.add('live');
    }
  }
}
