import React, { Component } from 'react';
import NavigationBar from '../../layout/NavigationBar';
import { Container, Row, Col, Button, Jumbotron } from 'reactstrap';
import "./landing.css";
import Octicon from 'react-octicon'
class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isTop: true,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
    });
  }

  render() {
    return (
      <div>
     
      <Jumbotron className="hero-area landing-hero-area " fluid>
        <Container>
       <NavigationBar landingView="1" className={this.state.isTop ? 'is-top' : 'asd'} />
          <Row className="align-items-center hero-text">
            <Col sm>
              <h1 className="display-2 text-center">Stop forgetting recipes</h1>
              <p className="display-4 text-center">Love of food starts with a good recipe, we can help keep them safely stored.</p>
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
      <Container>
      <Row className="align-items-center">
            <Col sm>
             <h2>More then just recipes</h2>
             <p>Never forget a recipe again, ready to be retrieved when needed.</p>
            </Col>
          </Row>  <Row className="align-items-center">
            <Col sm>
            <Octicon mega spin name="sync"/>
             <h3>Big feature</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget luctus augue. In ligula turpis, convallis at pulvinar sit amet, hendrerit quis nisi. Maecenas nec nibh elit. </p>
            </Col>     <Col sm>
             <h3>Big feature</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget luctus augue. In ligula turpis, convallis at pulvinar sit amet, hendrerit quis nisi. Maecenas nec nibh elit. </p>
            </Col>     <Col sm>
             <h3>Big feature</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget luctus augue. In ligula turpis, convallis at pulvinar sit amet, hendrerit quis nisi. Maecenas nec nibh elit. </p>
            </Col>     <Col sm>
             <h3>Big feature</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget luctus augue. In ligula turpis, convallis at pulvinar sit amet, hendrerit quis nisi. Maecenas nec nibh elit. </p>
            </Col>
          </Row>
          <Row>
            <p style={{height: '200px'}}>Section 2</p>
          </Row>
          <Row>
            <p style={{height: '200px'}}>Section 3</p>
          </Row>
          <Row>
            <p>Section 4</p>
          </Row>
          <Row>
            <p>Action Area</p>
          </Row>
          </Container>
    </div>);
  }
}

export default Home;
