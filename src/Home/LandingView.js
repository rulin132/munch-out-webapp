import React, { Component } from 'react';
import '../App.css';
import { Container, Row, Col, Navbar, Button, Jumbotron, NavbarBrand, NavbarToggler, Collapse, Form } from 'reactstrap';
class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
      <Navbar color="dark" dark  expand="lg" className="fixed-top">
        <NavbarBrand href="/">Munch Out</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
      
        <Collapse isOpen={this.state.isOpen} navbar>
          <Form className="form-inline my-2 my-lg-0 ml-auto">
            <Button color="success" outline className="my-2 my-sm-0 mx-2 text-light"  href="/signup">
              Sign Up
            </Button>
            <Button color="success" className="my-2 my-sm-0 mx-2 text-light" href="./login">
              Sign In
            </Button>
          </Form>
        </Collapse>
      </Navbar>
      <Jumbotron className="hero-area mt-5">
        <Container>
          <Row className="align-items-center">
            <Col sm>
              <h1 className="display-2 text-center">Munch Out</h1>
              <p className="display-4 text-center">A website you can save all your favourite recipes on.</p>
              <p className="lead text-center">
                <Button color="success" size="lg" href="/signup">Register Free Account</Button>
              </p>
              <p className="lead text-center">Already registered? 
                <a className="underline" href="./login">Log in</a>.
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>);
  }
}

export default Home;
