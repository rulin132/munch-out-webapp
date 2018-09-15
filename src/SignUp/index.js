import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase, { provider } from '../base';

import SignUpView from "./SignUpView";

const firebaseAuthKey = "firebaseAuthInProgress";

const appTokenKey = "appToken";


class SignUpContainer extends Component {

  componentDidMount() {
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.user) {
         let user = result.user;

          localStorage.removeItem(firebaseAuthKey);
 
          localStorage.setItem(appTokenKey, user.uid);

          this.props.history.push("/")
       }
      }.bind(this)).catch(function(error) {
      alert(error);
      })
     ;
  }
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  onGoogleButtonClick = () => {
    firebase.auth().signInWithRedirect(provider);
  }

  render() {
    return <SignUpView onSubmit={this.handleSignUp} onGoogleButtonClick={this.onGoogleButtonClick} />;
  }
}

export default withRouter(SignUpContainer);