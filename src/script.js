// import IMask from './node_modules/imask';

// var element = document.getElementById('phone');
// var maskOptions = {
//   mask: '+{54}(011)0000-0000'
// };
// var mask = IMask(element, maskOptions);


function login() {
    FB.login(function(response) {
        if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          console.log(response);
          console.log('Redireccionando a: formDataUser.html');
          Swal.fire({
            title: 'Bienvenido!',
            text: response.name,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(function(){
              window.location = "http://localhost:8080/formDataUser.html";
          });
        });
        } else {
        console.log('User cancelled login or did not fully authorize.');
        Swal.fire({
          title: 'Error',
          text: 'No autorizado',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        }
    });
  }


window.fbAsyncInit = function() {
  FB.init({
    appId      : '2605083403115042',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v9.0'           // Use this Graph API version for this call.
  });

};


function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.phonenumbers.read"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyCI7dtel6JRXCWKBdXNEuxkStEr8EYaO6k");
    return gapi.client.load("https://people.googleapis.com/$discovery/rest?version=v1")
        .then(function() { 
            console.log("GAPI client loaded for APIs"); 
            gapi.client.load('oauth2', 'v2', function () {
                var request = gapi.client.oauth2.userinfo.get({
                    'userId': 'me'
                });
                console.log(request);
                request.execute(function (resp) {
                    execute(resp.id); 
                });
            });
            },
        function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute(UserId) {
    return gapi.client.people.people.get({
      "resourceName": `people/${UserId}`,
      "personFields": "birthdays,names,photos",
      "sources": [
        "READ_SOURCE_TYPE_PROFILE"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log(response.result);
                console.log('Redireccionando a: formDataUser.html');
        
                Swal.fire({
                    title: 'Bienvenido!',
                    text: response.result.names[0].displayName,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(function(){
                      window.location = "http://localhost:8080/formDataUser.html";
                  });

              },
              function(err) { 
                console.error("Execute error", err);
                Swal.fire({
                  title: 'Error',
                  text: 'No autorizado',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
             });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "791551942698-8g31qv76mpfkm3ifce2qu0jb20ghr834.apps.googleusercontent.com"});
  });

