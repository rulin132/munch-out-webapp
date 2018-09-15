import React, { Component } from 'react';
import '../App.css';
import Navigation from '../Navigation';
import {Container} from 'reactstrap';

class DashboardView extends Component {
  render() {
    return (
  <div>
    <Navigation authenticated={this.props.authenticated} />

<Container>
      <h1>Welcome to Munch Out</h1>

    <form>
      <input type="search" placeholder="Search for Recipes" />
    </form>

    <h2>Latest Shopping List</h2>
      <ul><li>Item 1</li></ul>
    <h2>Most Recipes</h2>

      <ul><li>Recipe 1</li></ul>
    </Container>
  </div>);
  }
}

export default DashboardView;
