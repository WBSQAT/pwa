// import IMask from './node_modules/imask';

// var element = document.getElementById('phone');
// var maskOptions = {
//   mask: '+{54}(011)0000-0000'
// };
// var mask = IMask(element, maskOptions);

import initializeFacebook, { login as loginFB } from './authFacebook.js';
import initializeGoogle, { login as LoginG } from './authGoogle.js';

initializeFacebook('2605083403115042');
document.getElementById('fAuth').onclick = () => loginFB(
    (response) => {
        Swal.fire({
            title: 'Bienvenido!',
            text: response.name,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          .then(() => window.location = "http://localhost:8080/formDataUser.html");
    },
    (err) =>  Swal.fire({
        title: 'Error',
        text: 'No autorizado',
        icon: 'error',
        confirmButtonText: 'OK'
    })
);

initializeGoogle("791551942698-8g31qv76mpfkm3ifce2qu0jb20ghr834.apps.googleusercontent.com", "AIzaSyCI7dtel6JRXCWKBdXNEuxkStEr8EYaO6k");
document.getElementById('gAuth').onclick = () => LoginG(
    (response) => {
        Swal.fire({
            title: 'Bienvenido!',
            text: response.result.names[0].displayName,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          .then(() => window.location = "http://localhost:8080/formDataUser.html");
    },
    (err) =>  Swal.fire({
        title: 'Error',
        text: 'No autorizado',
        icon: 'error',
        confirmButtonText: 'OK'
    }));