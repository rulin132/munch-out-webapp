import React from "react";
import { Container, Row, Col, Navbar, Button, Jumbotron, NavbarBrand, NavbarToggler, Collapse, Form, Alert } from 'reactstrap';

const Recipes = () => {
  return (
<div class="container">
        <div class="col-md-6 mx-auto text-center">
            <div class="header-title">
                <h1 class="wv-heading--title">
                    RECIPE CATEGORIES
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mx-auto">
                <ul class="list-group mt-3">
                  <a href="#" class="list-group-item list-group-item-action">Chicken</a>
                  <a href="#" class="list-group-item list-group-item-action">Beef</a>
                  <a href="#" class="list-group-item list-group-item-action">Fish</a>
                   <a href="#" class="list-group-item list-group-item-action">Pork</a>
                  <a href="#" class="list-group-item list-group-item-action">Vegetarian</a>
                  <a href="#" class="list-group-item list-group-item-action">Vegan</a>
                  <a href="#" class="list-group-item list-group-item-action">Desserts</a>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default Recipes;
