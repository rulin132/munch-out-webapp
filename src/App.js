import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./Home/index.js";
import Login from "./Login";
import SignUp from "./SignUp";
import app from "./base";
import Recipes from "./Recipes";
import ForgotPassword from "./ForgotPassword";
import Categories from "./Categories";
import RecipeView from "./Recipe/View";
import RecipeEdit from "./Recipe/Edit";
import Loader from "./Loader";
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
    const { authenticated, loading, currentUser } = this.state;

   if (loading) {
      return (
      <Loader />
      );
   }

    return (
      <Router>
        <div>
        <Route exact path="/" component={Home} authenticated={authenticated} />
          <PrivateRoute
            exact
            path="/recipes"
            component={Recipes}
            user={currentUser}
          />
      
           <Route exact path="/recipe/:id/edit" component={RecipeEdit}/>
          <Route exact path="/recipe/show/:id" component={RecipeView} strict />

          <Route exact path="/recipe/new" component={RecipeEdit} />
        
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/passwordreset" component={ForgotPassword} />
          <PrivateRoute
            exact
            path="/categories"
            component={Categories}
            user={currentUser}
          />
  
        </div>
      </Router>
    )
  }
}

export default App;