import app from '../base';

export function loginWithGoogle() {
   // return app.auth().signInWithRedirect(googleProvider);
    //return authenticate(loginWithFirebase(googleProvider));
}

export function logout() {
    return app.auth().signOut();
}