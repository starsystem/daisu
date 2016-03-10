var path = window.location.host.split( '.' );
var username = path[0];
var myRequest = new Request('https://api.github.com/users/' + username + '/starred');
fetch(myRequest).then(function(response) {
  return response.json().then(function(json) {
    console.log(json);
  });
});
