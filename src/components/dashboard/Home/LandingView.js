import React, { Component } from 'react';
import NavigationBar from '../../layout/NavigationBar';
import { Container, Row, Col, Button, Jumbotron } from 'reactstrap';
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
     
      <Jumbotron className="hero-area">
        <Container>
       <NavigationBar landingView="1" />
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
