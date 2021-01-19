
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
        
                // swal("Bienvenido!", response.result.names[0].displayName, "success");
                Swal.fire({
                    title: 'Bienvenido!',
                    text: response.result.names[0].displayName,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(function(){
                      window.location = "http://localhost:8080/formDataUser.html";
                  });

              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "791551942698-8g31qv76mpfkm3ifce2qu0jb20ghr834.apps.googleusercontent.com"});
  });

