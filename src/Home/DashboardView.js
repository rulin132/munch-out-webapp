import React, { Component } from 'react';
import '../App.css';

import '../assets/styles/dashboard.css';
import Navigation from '../Navigation';

import Search from '../Search';
import {Container, Jumbotron, Button} from 'reactstrap';

class DashboardView extends Component {
  render() {
    return (
      <div>
        <Navigation authenticated={this.props.authenticated} />

        <Container fluid>
          <Jumbotron className="hero-area">
          <Container className="search-area">
              <p className="search-lead-text">Your recipes are just a search away</p>
              <Search />

              <p className="search-or-text">Or</p>
              <Button color="primary" size="lg">Browse by Category</Button>
            </Container>
          </Jumbotron>
          
        </Container>
      </div>
    );
  }
}

export default DashboardView;
