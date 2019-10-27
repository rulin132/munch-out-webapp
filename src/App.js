import React, { Component } from "react";
import { Router, Switch,  Route } from "react-router-dom";

import NavigationBar from './components/layout/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from "./components/dashboard/Home/index.js";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import LogoutView from "./components/auth/LogoutView";
import Recipes from "./components/recipes/Recipes";
import ForgotPassword from "./components/auth/ForgotPassword";
import Categories from "./components/categories/Categories";
import RecipeView from "./components/recipes/Recipe/View";
import RecipeEdit from "./components/recipes/Recipe/Edit";
import RecipeByCategory from "./components/categories/RecipeByCategory";
import history from "./history";
class App extends Component {


  render(){ 
    return (
      <Router history={history}>
        <div className="app">
          <NavigationBar mainNav="1" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipe/:id/edit" component={RecipeEdit} />
            <Route exact path="/recipe/show/:id" component={RecipeView} strict />
            <Route exact path="/recipe/new" component={RecipeEdit} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path='/signout'component={LogoutView} />
            <Route exact path="/passwordreset" component={ForgotPassword} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/categories/recipeByCategory/:id" component={RecipeByCategory} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
