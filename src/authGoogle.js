  export function login(onLogin, onError) {
    //SDK https://github.com/google/google-api-javascript-client
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.phonenumbers.read"})
        .then(gapi.client.load("https://people.googleapis.com/$discovery/rest?version=v1"))
        .then(() => { 
            gapi.client.load('oauth2', 'v2', () => {
                var request = gapi.client.oauth2.userinfo.get({
                    userId: 'me'
                });
                request.execute((resp) =>
                  gapi.client.people.people.get({
                    resourceName: `people/${resp.id}`,
                    personFields: "birthdays,names,photos",
                    sources: [
                      "READ_SOURCE_TYPE_PROFILE"
                    ]
                  }).then((respPeople) => {
                    let date = respPeople?.result?.birthdays
                      .find((birthday) => birthday.date.year && birthday.date.month && birthday.date.day)?.date
                    return onLogin ? onLogin({ 
                    name: resp?.given_name, 
                    surname: resp?.family_name,
                    email: resp?.email,
                    photo: respPeople?.result?.photos[0]?.url,
                    birthdate: date ? `${date.day}/${date.month}/${date.year}` : null,
                  }) : null
                })
                );
            });
            },
        (err) => onError ? onError(err) : null);
  }
  
  export default function initializeGoogle(client_id, apiKey) {
    //https://developers.facebook.com/apps/
    gapi.load("client:auth2", () => {
      gapi.auth2.init({client_id}) //"Identificador de la app"
      .then(() => gapi.client.setApiKey(apiKey)); //"Clave secreta de la app"
    });
  }
