export function login(onLogin, onError) {
  return FB.login((response) => { //Redireccion al login de Facebook
      if (response.authResponse) {
        //Se obtiene informacion del usuario
        FB.api('/me', (responseMe) => onLogin ? onLogin({//?fields=id,name,email,profile_pic
          name: responseMe.name,
        }) : null); 
      } else {
        if (onError)
          onError(response);
      }
  }, {scope: 'public_profile,email'});
}

export default function initializeFacebook(appId) {
  window.fbAsyncInit = () => {
    FB.init({                       // https://developers.facebook.com/docs/javascript/reference/FB.init/v9.0
      appId,                        // App se genera en la consola de desarrolladores
      cookie     : true,            // Permite crear una cookie en la sesión
      xfbml      : true,            // Permite que plugins sean renderizados
      version    : 'v9.0'           // Que version de Graph API se usa. Respetar formato
    });
  };
}
