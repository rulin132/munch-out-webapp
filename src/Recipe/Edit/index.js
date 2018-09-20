import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from "../../base";
import Navigation from "../../Navigation";
import {Container, Alert, Fade} from 'reactstrap';



import Form from './Form';
const appTokenKey = "appToken";

class RecipeContainer extends Component {
    constructor(props) {
        super(props);

        this.recipeId = this.props.match.params.id;

        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);

        this.state = {
            recipeName: '',
            image: {
        		id: '',
        		url: ''
            },
            cookingTimes: {
                prepTime: {
                    hours: '',
                    minutes: '',
                },
                cookTime: {
                    hours: '',
                    minutes: '',
                },
            },
            ingredients: [],
            methods: [],
            notes: '',
            createdAt: '',
            updatedAt: '',
            isSubmitted: false,
            formErrors: {
                name: ''
            },
        };

        const userId = localStorage.getItem(appTokenKey);

        this.firebaseRef = firebase.database().ref('users/' + userId + '/recipes');
    }

    getPageHeading() {
        if (this.recipeId) {
            return <h1>Edit Recipe</h1>;
        }

        return <h1>Add Recipe</h1>;
    }

    isValidForm() {
        if (this.state.formErrors.name) {
            return false;
        }

        return true;
    }

    async handleUploadSuccess (filename) {
        try {
            let { bucket, fullPath } = await firebase.storage().ref('images').child(filename).getMetadata();
            console.log('bucket', bucket)
            console.log('fullPath', fullPath)
            let downloadURL = await firebase.storage().ref('images').child(filename).getDownloadURL();
            console.log('downloadURL', downloadURL)

            let { uid, email, displayName } = await firebase.auth().currentUser;

            let newPhoto = {
                url: downloadURL,
                userName: displayName,
                userId: uid,
                email,
                bucket,
                fullPath
            }
            console.log('newPhoto', newPhoto);


            this.setState({image:newPhoto});
        } 

        catch(err) {
            console.error(err);
        }
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

        handleProgress = (progress) => this.setState({progress});

        handleUploadError = (error) => {

        this.setState({isUploading: false});
    }

    componentWillMount(){
        let id = this.props.match.params.id;
        const userId = localStorage.getItem(appTokenKey);

        if (id) {
            let recipeRef = firebase.database().ref('users/' + userId + '/recipes/'+ id);
            recipeRef.once('value', (snapshot) => {
            this.setState({ 
                id: snapshot.key,  
                recipeName: snapshot.val().recipeName,
            image: {
                id: '',
                url: ''
            },
            cookingTimes: {
                prepTime: {
                    hours: '',
                    minutes: '',
                },
                cookTime: {
                    hours: '',
                    minutes: '',
                },
            },
            ingredients: [],
            methods: [],
            notes: '',
            createdAt: '',
            updatedAt: '' });
            });
        }
      }

      handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);

        this.setState({isSubmitted: true});
        
        if (!this.isValidForm()) {
            this.setState({displayFormError: 'Unable to save due to errors on the form'});

            return;
        }

        let key = this.recipeId;

        if (key) {
            this.setState({
                updatedAt: firebase.database().ServerValue.TIMESTAMP
            });

        this.firebaseRef.update({
            [key]:{
              ...this.state 
            }
          });
        } else {
            this.setState({
                updatedAt: firebase.database().ServerValue.TIMESTAMP,
                createdAt: firebase.database().ServerValue.TIMESTAMP
            });
            key = this.firebaseRef.push(this.state).key;
        }
        
        this.props.history.push("/recipe/show/" + key);
    }
      
  render() {
    const pageHeading = this.getPageHeading();
    
    return (
        <div>
            <Navigation authenticated={this.props.authenticated} />
      
            <Container>
                {pageHeading}

                {this.state.displayFormError && (<Fade><Alert color="danger">{this.state.displayFormError}</Alert></Fade>)}
               
               <Form handleSubmit={this.handleSubmit} recipeId={this.recipeId} history={this.props.history} />
        </Container>
        </div>
    );
  }
}

export default withRouter(RecipeContainer);
