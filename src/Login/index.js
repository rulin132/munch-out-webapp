import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import firebase, { provider } from '../base';

const firebaseAuthKey = "firebaseAuthInProgress";

const appTokenKey = "appToken";

class LogInContainer extends Component {
  constructor(props) {
    super(props);

    this.onGoogleButtonClick = this.onGoogleButtonClick.bind(this);
  }
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
      localStorage.setItem(firebaseAuthKey, "1");
    } catch (error) {
      alert(error);
    }
  };



  componentWillMount() {
    firebase.auth().getRedirectResult().then(function(result) {
     if (result.user) {
        console.log("GoogleLogin Redirect result");
    
        // The signed-in user info.
        let user = result.user;
        console.log("user:", JSON.stringify(user));

        console.log("User signed in: ", JSON.stringify(user));

        localStorage.removeItem(firebaseAuthKey);

        // here you could authenticate with you web server to get the
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem(appTokenKey, user.uid);

        // store the token
         this.props.history.push("/")
      }
     }.bind(this)).catch(function(error) {
     // ...
     alert(error);
     })
    ;

    /**
     * We have appToken relevant for our backend API
     */
    // if (localStorage.getItem(appTokenKey)) {
    //     this.props.history.push("/app/home");
    //     return;
    // }

    firebase.auth().onAuthStateChanged(user => {
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

  onGoogleButtonClick() {
    firebase.auth().signInWithRedirect(provider);

  }
  render() {
    return <LogInView onSubmit={this.handleSignUp} onGoogleButtonClick={this.onGoogleButtonClick} />;
  }
}

export default withRouter(LogInContainer);
