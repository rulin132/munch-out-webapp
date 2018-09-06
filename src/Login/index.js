import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import app from "../base";

const firebaseAuthKey = "firebaseAuthInProgress";

const appTokenKey = "appToken";

class LogInContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
      localStorage.setItem(firebaseAuthKey, "1");
    } catch (error) {
      alert(error);
    }
  };

  componentWillMount() {
    /*         firebaseAuth().getRedirectResult().then(function(result) {
     if (result.user) {
     console.log("GoogleLogin Redirect result");
     if (result.credential) {
     // This gives you a Google Access Token. You can use it to access the Google API.
     let token = result.credential.accessToken;
     // ...
     }
     // The signed-in user info.
     let user = result.user;
     console.log("user:", JSON.stringify(user));
     }
     }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
     // ...
     alert(error);
     })*/
    ;

    /**
     * We have appToken relevant for our backend API
     */
    // if (localStorage.getItem(appTokenKey)) {
    //     this.props.history.push("/app/home");
    //     return;
    // }

    app.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("User signed in: ", JSON.stringify(user));

            localStorage.removeItem(firebaseAuthKey);

            // here you could authenticate with you web server to get the
            // application specific token so that you do not have to
            // authenticate with firebase every time a user logs in
            localStorage.setItem(appTokenKey, user.uid);

            // store the token
            // this.props.history.push("/app/home")
        }
});
  }
  render() {
    return <LogInView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(LogInContainer);
