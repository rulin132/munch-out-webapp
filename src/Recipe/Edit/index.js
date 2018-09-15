import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from "../../base";
import Navigation from "../../Navigation";
import {Container, Form, FormGroup, Label, Input, Row, Col, Button, FormFeedback, Alert, Fade} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import CookingTimes from './CookingTimes';
import Ingredients from './Ingredients/';
import Methods from './Methods/';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

const appTokenKey = "appToken";

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.recipeId = this.props.match.params.id;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleCookingTimesChange = this.handleCookingTimesChange.bind(this);
        this.handleMethodsChange = this.handleMethodsChange.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleChangeRecipeName = this.handleChangeRecipeName.bind(this);
        this.validateName = this.validateName.bind(this);

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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);

        this.setState({isSubmitted: true});
        
        if (!this.isValidForm()) {
            this.setState({displayFormError: 'Unable to save due to errors on the form'});

            return;
        }

        // TODO edit recipe

        let key = this.recipeId;

        if (key) {
        this.firebaseRef.update({
            [key]:{
              ...this.state 
            }
          });
        } else {
            key = this.firebaseRef.push(this.state).key;
        }
        
        this.props.history.push("/recipe/show/" + key);
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
    changeRecipeName(e) {
        this.validateName(e);
        this.setState({recipeName:this.state.recipeName});
    }
    handleIngredientsChange(ingredients) {
        this.setState({ingredients: ingredients});
    }
    handleCookingTimesChange(cookingTimes) {
        this.setState({cookingTimes: cookingTimes});
    }
    handleMethodsChange(methodSteps) {
        this.setState({methods: methodSteps});
    }

    handleChangeRecipeName(e) {
        this.validateName(e);
        this.setState({recipeName: e.target.value});
    }
    onChangeNotes(e) {
        this.setState({notes: e.target.value});
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

        handleProgress = (progress) => this.setState({progress});

        handleUploadError = (error) => {

        this.setState({isUploading: false});
    }
    componentWillMount(){
        let id = this.props.match.params.id;
        const userId = localStorage.getItem(appTokenKey);

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

      validateName(e) {
        const { formErrors } = this.state
     
          if (e.target.value.length < 1) {
            formErrors.name = 'invalid';
            this.setState({formErrors: true});
          } else {
            formErrors.name = null;
            this.setState({displayFormError: null});
          }
          this.setState({ formErrors })
        }
  render() {
    const pageHeading = this.getPageHeading();
    const newImageUpload = (<div>
        <FontAwesomeIcon size="5x" color="#2a99d8" icon={faCloudUploadAlt} />
    <p>Try dropping an image here, or click to select an image to upload.</p>
    </div>
    );

    return (
        <div>
            <Navigation authenticated={this.props.authenticated} />
      
            <Container>
                {pageHeading}

                {this.state.displayFormError && (<Fade><Alert color="danger">{this.state.displayFormError}</Alert></Fade>)}
               
                <Form onSubmit={this.handleSubmit}>
             <Row>
                 <Col><FormGroup>

          <Input 
            type="text" 
            name="name" 
            id="recipeName" 
            placeholder="Recipe Name" 
            value={this.state.recipeName} 
            onChange={this.handleChangeRecipeName} 
            bsSize="lg" 
            invalid={this.state.isSubmitted && this.state.formErrors.name} />
          <FormFeedback>Need to give this recipe an awesome name!</FormFeedback>
        </FormGroup></Col>
                 <Col><label className="file-upload">
                 {!this.state.image.url && 

newImageUpload
         

}
       
{this.state.image.url &&
<div>
    <img alt="" src={this.state.image.url} />
    </div>
    }
    {this.state.isUploading &&

        <p>Progress: {this.state.progress}</p>
        
        }
   <CustomUploadButton
     hidden
     accept="image/*"
     storageRef={firebase.storage().ref('images')}
     onUploadStart={this.handleUploadStart}
     onUploadError={this.handleUploadError}
     onUploadSuccess={this.handleUploadSuccess}
     onProgress={this.handleProgress}
   >Select File to Upload
   </CustomUploadButton></label>
    </Col>
</Row>
     
<CookingTimes cookingTimes={this.state.cookingTimes} onCookingTimesChange={this.handleCookingTimesChange}  />
              
<Row className="mt-5">
    <Col className="col-12 col-lg-6">
        <Ingredients items={this.state.ingredients} onIngredientsChange={this.handleIngredientsChange} />
    </Col>
    <Col className="col-12 col-lg-6">
        <Methods items={this.state.methods} onMethodsChange={this.handleMethodsChange} />  
    </Col>
</Row>
<Row className="mt-5">
    <Col>
    <Label>Notes</Label>
    <Input type="textarea"  onChange={ this.onChangeNotes } value={ this.state.notes } /></Col>
</Row>
        
        <Row className="mt-5">
            <Col>
            <Button color="danger" href={'/recipe/show/' + this.state.id}>Cancel</Button> <Button type="submit">Submit</Button>
            </Col>
        </Row>
        
        </Form>
        </Container>
        </div>
    );
  }
}

export default withRouter(RecipeContainer);
