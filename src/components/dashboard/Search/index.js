import React, { Component } from 'react';
import {Form} from 'reactstrap';
import Suggestions from '../Suggestions'

class Search extends Component {
    state = {
        query: '',
        results: []
      }

    getInfo = () => {
      
    }
    
    handleInputChange = () => {
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo()
          }
        } else {
            this.setState({
                results: []
            });
        }
      })
    }
     
    render() {
      return (
        <Form>
            <div className="md-form active-green active-green-2 mb-3">

          <input className="form-control" type="text" aria-label="Search"
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          </div>
          <Suggestions results={this.state.results} />
        </Form>
      )
    }
}

export default Search;