import React, { Component } from "react";
import { withRouter } from "react-router";
import Recipe from "./RecipeView";
import firebase from "../../base";

const appTokenKey = "appToken";

class RecipeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {}
    }
  }
  componentWillMount(){
    let id = this.props.match.params.id;
    const userId = localStorage.getItem(appTokenKey);
    console.log(id);
    let recipeRef = firebase.database().ref('users/' + userId + '/recipes/'+ id);
    recipeRef.once('value', (snapshot) => {
      console.log('recipe');
      console.log(snapshot.key);
      this.setState({ recipe: snapshot.val() });
    });
    console.log(recipeRef);
  }

  render() {
    console.log(this.props);
    return <Recipe id={this.props.match.params.id} recipe={this.state.recipe} />;
  }recipe
}

export default withRouter(RecipeView);
