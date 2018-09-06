import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCUHhSmVxJPtnZ0Pl2i_SU8pB0GbZNMAbs",
    authDomain: "munch-out-4b90e.firebaseapp.com",
    databaseURL: "https://munch-out-4b90e.firebaseio.com",
    projectId: "munch-out-4b90e",
    storageBucket: "munch-out-4b90e.appspot.com",
    messagingSenderId: "211809992857"
  });

export default app;