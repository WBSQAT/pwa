import './mask.js';
import initializeFacebook, { login as loginFB } from './authFacebook.js';
import initializeGoogle, { login as LoginG } from './authGoogle.js';
import './formDataUser.js';

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
        (user) => {
            Swal.fire({
                title: 'Bienvenido!',
                text: user.name,
                icon: 'success',
                confirmButtonText: 'OK'
                })
                .then(() => {
                    window.location = Object.entries(user)
                        .reduce((acum, [ key, value ]) => `${acum}&${key}=${value}`, "http://localhost:8080/formDataUser.html?")
                });
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
        (user) => {
            Swal.fire({
                title: 'Bienvenido!',
                text: `${user.name} ${user.surname}`,
                icon: 'success',
                confirmButtonText: 'OK'
                })
                .then(() => {
                    window.location = Object.entries(user)
                        .reduce((acum, [ key, value ]) => `${acum}&${key}=${value}`, "http://localhost:8080/formDataUser.html?")
            });
        },
        (err) =>  Swal.fire({
            title: 'Error',
            text: 'No autorizado',
            icon: 'error',
            confirmButtonText: 'OK'
        }));
}
