import './mask.js';
import initializeFacebook, { login as loginFB } from './authFacebook.js';
import initializeGoogle, { login as LoginG } from './authGoogle.js';

const fauth = document.getElementById('fAuth');
const gauth = document.getElementById('gAuth');
const tauth = document.getElementById('tAuth');
const addHoverEffect = (elemento) => {
    if (elemento?.onmouseover)
        elemento.onmouseover = () => elemento.classList.add("animate__animated", "animate__wobble");
    if (elemento?.onmouseout)
        elemento.onmouseout = () => elemento.classList.remove("animate__animated", "animate__wobble");
}

addHoverEffect(fauth);
addHoverEffect(gauth);
addHoverEffect(tauth);

if (fauth) {
    initializeFacebook('2605083403115042');
    fauth.onclick = () => loginFB(
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
}

if (gauth) {
    initializeGoogle("791551942698-8g31qv76mpfkm3ifce2qu0jb20ghr834.apps.googleusercontent.com", "AIzaSyCI7dtel6JRXCWKBdXNEuxkStEr8EYaO6k");
    gauth.onclick = () => LoginG(
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
}
