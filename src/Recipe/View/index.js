import React, { Component } from "react";
import { withRouter } from "react-router";
import Recipe from "./RecipeView";
import firebase from "../../base";

const appTokenKey = "appToken";

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.recipeRef = null;

    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      recipe: {}
    }
  }
  componentWillMount(){
    let id = this.props.match.params.id;
    const userId = localStorage.getItem(appTokenKey);

    this.recipeRef = firebase.database().ref('users/' + userId + '/recipes/'+ id);
    this.recipeRef.once('value', (snapshot) => {
      this.setState({ recipe: snapshot.val() });
    });
  }

  handleDelete(id) {
    const userId = localStorage.getItem(appTokenKey);

    let recipeRef = firebase.database().ref('users/' + userId + '/recipes');
    recipeRef.update({
      [id]: null
    });

    this.props.history.push("/recipes");
  
  }
  render() {
    return <Recipe id={this.props.match.params.id} recipe={this.state.recipe} toggleDeleteModal={this.toggleDeleteModal} handleDelete={this.handleDelete} />;
  }recipe
}

export default withRouter(RecipeView);
