//For the module builds, these are available in the following manner
//(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):
// ES Modules:
//import firebase from 'firebase/app';
//import 'firebase/<PACKAGE>';
import firebase from 'firebase/app';

import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';


firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;