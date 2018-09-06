import React, { Component } from "react";
import { withRouter } from "react-router";
import Recipes from "./RecipesView";

class RecipesContainer extends Component {
  render() {
    return <Recipes />;
  }
}

export default withRouter(RecipesContainer);
