import React, { Component } from 'react';
import LandingView from './LandingView';
import DashboardView from './DashboardView';

const appTokenKey = "appToken";

class Home extends Component {
  render() {
    if (localStorage.getItem(appTokenKey)) {
      return <DashboardView />;
    }
    return <LandingView />;
  }
}

export default Home;
