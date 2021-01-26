//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '2605083403115042',
//       cookie     : true,
//       xfbml      : true,
//       version    : 'v9.0'
//     });
      
//     FB.AppEvents.logPageView();   
      
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/es_ES/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//       console.log(response);
      
//     });
//   }

//   function userLogin() {
//     console.log('Hola');
    
//   }

// function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
//   console.log('statusChangeCallback');
//   console.log(response);                   // The current login status of the person.
//   if (response.status === 'connected') {   // Logged into your webpage and Facebook.
//     testAPI();  
//   } else {                                 // Not logged into your webpage or we are unable to tell.
//     console.log('disconected');
    
//   }
// }

export function login() {
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


// function checkLoginState() {               // Called when a person is finished with the Login Button.
//   FB.getLoginStatus(function(response) {   // See the onlogin handler
//     statusChangeCallback(response);
//   });
// }

export default function initializeFacebook(appId) {
  window.fbAsyncInit = () => {
    FB.init({
      appId,
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v9.0'           // Use this Graph API version for this call.
    });
  };
}

//   FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
//     statusChangeCallback(response);        // Returns the login status.
//   });

// function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//   console.log('Welcome!  Fetching your information.... ');
//   FB.api('/me', function(response) {
//     console.log('Successful login for: ' + response.name);
//     console.log(response);
//     console.log('Redireccionando a: formDataUser.html');
//     Swal.fire({
//       title: 'Bienvenido!',
//       text: response.name,
//       icon: 'success',
//       confirmButtonText: 'OK'
//     }).then(function(){
//         window.location = "http://localhost:8080/formDataUser.html";
//     });
//   });
// }
