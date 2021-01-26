// import IMask from './node_modules/imask';

// var element = document.getElementById('phone');
// var maskOptions = {
//   mask: '+{54}(011)0000-0000'
// };
// var mask = IMask(element, maskOptions);

import initializeFacebook, { login } from './authFacebook.js';
import initializeGoogle, { authenticate, loadClient } from './authGoogle.js';

initializeFacebook('2605083403115042');
document.getElementById('fAuth').onclick = login;

initializeGoogle("791551942698-8g31qv76mpfkm3ifce2qu0jb20ghr834.apps.googleusercontent.com");
document.getElementById('gAuth').onclick = () => authenticate()
    .then(loadClient("AIzaSyCI7dtel6JRXCWKBdXNEuxkStEr8EYaO6k"))