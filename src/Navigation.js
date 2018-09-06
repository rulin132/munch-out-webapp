import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Navbar, Button, Jumbotron, NavbarBrand, NavbarToggler, Collapse, Form } from 'reactstrap';
import {logout} from "./helpers/auth";

const appTokenKey = "appToken";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout() {
    logout().then(function () {
        localStorage.removeItem(appTokenKey);
        //this.props.history.push("/login");
        console.log("user signed out from firebase");
}.bind(this));
  }
  getMenu() {
    if (this.props.authenticated) {
        return (
            <Form className="form-inline my-2 my-lg-0 ml-auto">
                <Button color="success" outline className="my-2 my-sm-0 mx-2 text-light"  href="sign-up.html">
                    Sign Up
                </Button>
                <Button color="success" className="my-2 my-sm-0 mx-2 text-light" href="./login">
                    Sign In
                </Button>
            </Form>
        );
    }

    return (
        <Form className="form-inline my-2 my-lg-0 ml-auto">
     
        <Button color="success" className="my-2 my-sm-0 mx-2 text-light" onClick={this.handleLogout}>
            Log out
        </Button>
    </Form>
    );
  }
  render() {
    const menuButtons = this.getMenu();
    return (
      <div>
      <Navbar color="dark" dark  expand="lg">
        <NavbarBrand href="/">Munch Out</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
      
        <Collapse isOpen={this.state.isOpen} navbar>
            {menuButtons}
        </Collapse>
      </Navbar>
    </div>);
  }
}

export default Navigation;
