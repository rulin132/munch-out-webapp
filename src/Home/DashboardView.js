import React, { Component } from 'react';
import '../App.css';
import Navigation from '../Navigation';

class DashboardView extends Component {
  render() {
    return (
  <div>
    <Navigation authenticated={this.props.authenticated} />

    <h1>SAVED RECIPES</h1>

    <p>Click on the recipe you want to view</p>

    <h2>VEGETABLE RECIPES</h2>

    <div id="vegetable">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div>

    <h2>FRUIT RECIPES</h2>

    <div id="fruit">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div> 

    <h2>DAIRY RECIPES</h2>

    <div id="dairy">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div>

    <h2>MEAT RECIPES</h2>
    <div id="meat">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div>

    <h2>SEAFOOD RECIPES</h2>
    <div id="seafood">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div> 

    <h2>LEFT-OVERS RECIPES</h2>
    <div id="left-overs">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div>

    <h2>PASTA RECIPES</h2>

    <div id="pasta">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div>
    
    <h2>OTHER RECIPES</h2>
    <div id="other">
      <table>
        <tr><td>Recipe Name</td></tr>
        <tr><td>Date Placed In Fridge</td></tr>
      </table>
    </div>


  </div>);
  }
}

export default DashboardView;
