export const firebaseSignIn = (email, password)=>{
    return fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCvQM-osJvMeJVIrTUXETRasaB_bzj7AbI', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": 'application/json'
            }
        })
}

export const firebaseSignUp = (email,password)=>{
   return fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCvQM-osJvMeJVIrTUXETRasaB_bzj7AbI', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
}
