import React, { Component } from 'react';
import LandingView from './LandingView';
import DashboardView from './DashboardView';
import { connect} from 'react-redux'

class Home extends Component {

  render() {
    const { auth } = this.props;

  const authView = auth.uid ? <DashboardView /> :
  <LandingView />;

    return authView;
  }
}



const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Home);