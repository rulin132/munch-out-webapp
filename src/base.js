//For the module builds, these are available in the following manner
//(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):
// ES Modules:
//import firebase from 'firebase/app';
//import 'firebase/<PACKAGE>';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyCUHhSmVxJPtnZ0Pl2i_SU8pB0GbZNMAbs",
  authDomain: "munch-out-4b90e.firebaseapp.com",
  databaseURL: "https://munch-out-4b90e.firebaseio.com",
  projectId: "munch-out-4b90e",
  storageBucket: "munch-out-4b90e.appspot.com",
  messagingSenderId: "211809992857"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();


export const appTokenKey = "appToken";
export default firebase;