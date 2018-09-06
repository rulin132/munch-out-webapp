import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./Home/index.js";
import Login from "./Login";
import SignUp from "./SignUp";
import app from "./base";
import Recipes from "./Recipes";
import ForgotPassword from "./ForgotPassword";
class App extends React.Component {
  state = { loading: true, authenticated: false, user: null };
  
  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render(){
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
        <Route exact path="/" component={Home} authenticated={authenticated} />
          <PrivateRoute
            exact
            path="/recipes"
            component={Recipes}
            authenticated={authenticated}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/passwordreset" component={ForgotPassword} />
        </div>
      </Router>
    )
  }
}

export default App;