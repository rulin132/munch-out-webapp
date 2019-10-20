
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCUHhSmVxJPtnZ0Pl2i_SU8pB0GbZNMAbs",
  authDomain: "munch-out-4b90e.firebaseapp.com",
  databaseURL: "https://munch-out-4b90e.firebaseio.com",
  projectId: "munch-out-4b90e",
  storageBucket: "munch-out-4b90e.appspot.com",
  messagingSenderId: "211809992857"
};
firebase.initializeApp(config);

export default firebase;