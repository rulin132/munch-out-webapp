import React, { Component } from "react";
import LogInView from "./ForgotPasswordView";
import { withRouter } from "react-router";
import app from "../base";
import ForgotPasswordView from './ForgotPasswordView';
const firebaseAuthKey = "firebaseAuthInProgress";

const appTokenKey = "appToken";

class ForgotPasswordContainer extends Component {
  state = { sentPasswordRequest: false };

  handlePasswordReset = async event => {
    event.preventDefault();
    const { email } = event.target.elements;
    try {
     app
        .auth()
        .sendPasswordResetEmail(email.value);

        this.setState({sentPasswordRequest: true});
    } catch (error) {
      alert(error);
    }
  };
  // componentWillMount() {
  //   app.auth().onAuthStateChanged(user => {
  //       if (user) {
  //         console.log("User signed in: ", JSON.stringify(user));

  //         localStorage.removeItem(firebaseAuthKey);

  //         // here you could authenticate with you web server to get the
  //         // application specific token so that you do not have to
  //         // authenticate with firebase every time a user logs in
  //         localStorage.setItem(appTokenKey, user.uid);

  //         // store the token
  //         // this.props.history.push("/app/home")
  //     }
  //   });

  // }
  render() {
    return <ForgotPasswordView onSubmit={this.handlePasswordReset} hasPasswordSentRequest={this.state.sentPasswordRequest} />;
  }
}

export default withRouter(ForgotPasswordContainer);
