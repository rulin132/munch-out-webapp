import React, { Component } from 'react';

import NavigationBar from '../../layout/NavigationBar';
import Search from '../Search';
import {Container, Jumbotron, Button} from 'reactstrap';

class DashboardView extends Component {
  render() {
    return (
      <div>
      <NavigationBar />

        <Container fluid className="mt-10">
          <Jumbotron className="hero-area dash-hero">
          <Container className="search-area">
              <p className="search-lead-text">Your recipes are just a search away</p>
              <Search />

              <p className="search-or-text">Or</p>
              <Button color="primary" size="lg" href="/categories/">Browse by Category</Button>
            </Container>
          </Jumbotron>
          
        </Container>
      </div>
    );
  }
}

export default DashboardView;
