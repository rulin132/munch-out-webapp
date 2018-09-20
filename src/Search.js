import React from 'react';
import {Form} from 'reactstrap';
import firebase from "./base";
import Suggestions from './components/Suggestions.js'
const appTokenKey = "appToken";

class Search extends React.Component {
    state = {
        query: '',
        results: []
      }
     
      constructor(props) {
        super(props);
    
        const userId = localStorage.getItem(appTokenKey);
    
        this.firebaseRef = firebase.database().ref('users/' + userId + '/recipes');
    }

    getInfo = () => {
        let queryText = this.state.query;
      let query = this.firebaseRef
        .orderByChild("recipeName")
        .startAt(queryText)
        .endAt(queryText + "\uf8ff");
        // query.on("child_removed", (snapshot) => {
        //     console.log('Removed child');
        //     console.log(snapshot)
        //     let results = this.state.results;
        //     results[snapshot.key] = null;

        //     this.setState({
        //         results
        //     });
        // });
        query.on("value", (snapshot) => {
            let results = [];
            console.log(snapshot.val());

            snapshot.forEach(s => {
                console.log(s.val());
                results.push({ name: s.val().recipeName, id: s.key });
            });

            this.setState({
                results
            });
        
      });
      
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
              <div class="md-form active-green active-green-2 mb-3">

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