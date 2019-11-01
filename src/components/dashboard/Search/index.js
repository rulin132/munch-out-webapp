import React, { Component } from 'react';
import {Form, Input} from 'reactstrap';
import Suggestions from '../Suggestions'
import { connect } from 'react-redux';
import { searchForRecipe }
        from '../../../store/actions/recipeActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';

class Search extends Component {
    state = {
        query: '',
        results: []
      }

    getInfo = (queryText) => {
      this.props.searchForRecipe(queryText);//searchForRecipe
    }
    
    handleInputChange = (e) => {
      console.log(e.target.value);
      this.setState({
        query: e.target.value
      }, () => {
        if (this.state.query && this.state.query.length > 0) {
      
            this.getInfo(this.state.query)
          
        } else {
                 this.getInfo('')
        }
      })
    }
     
    render() {
      console.log(this.state, this.props);
      const results = (typeof this.props.results !== 'undefined' ? this.props.results.results : []);
      return (
        <Form>
            <div className="md-form active-green active-green-2 mb-3">

      
            <Input className="form-control" type="text" aria-label="Search"
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
            </div>
            <Suggestions results={results} />
        </Form>
      )
    }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state,  ownProps);
  return {
    results: state.recipe.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    searchForRecipe: (queryText) => dispatch(searchForRecipe(queryText)) ,
      
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
      { collection: 'recipes' }
  ])
)(Search);