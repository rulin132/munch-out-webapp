import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signOut } from '../../store/actions/authActions';

class LogoutView extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(signOut());
  }

  render() {
      const auth = this.props.auth;
    if (!auth.uid) {
        return <Redirect to='/' />
  }
    return null;
  }

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(LogoutView);