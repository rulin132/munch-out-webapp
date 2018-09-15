import React, { Component } from "react";
import { withRouter } from "react-router";
import Recipes from "./RecipesView";

import firebase from "../base";

const appTokenKey = "appToken";

class RecipesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        recipes: [],
    };

    const userId = localStorage.getItem(appTokenKey);

    this.firebaseRef = firebase.database().ref('users/' + userId + '/recipes');
}

  componentDidMount() {
    this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
        var recipes = [];
        this.setState({
            recipes: recipes,
            fetching: true
        });
        dataSnapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.id = childSnapshot.key;
            recipes.push(item);
        });
        
        this.setState({
          recipes: recipes
        });
    }.bind(this));
  }

  render() {
    return <Recipes authenticated={this.props.authenticated} recipes={this.state.recipes} />;
  }
}

export default withRouter(RecipesContainer);
