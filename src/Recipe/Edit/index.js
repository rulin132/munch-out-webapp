import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from "../../base";
import Navigation from "../../Navigation";
import {Container, Form, FormGroup, Label, Input, Row, Col, Button} from 'reactstrap';

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
            updatedAt: ''

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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let key = this.firebaseRef.push(this.state).key;
        this.props.history.push("/recipes/show/" + key);
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
    onChangeNotes(e) {
        this.setState({notes: e.target.value});
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

        handleProgress = (progress) => this.setState({progress});

        handleUploadError = (error) => {

        this.setState({isUploading: false});

        console.error(error);

    }
    componentWillMount(){
        let id = this.props.match.params.id;
        const userId = localStorage.getItem(appTokenKey);
        console.log(id);
        let recipeRef = firebase.database().ref('users/' + userId + '/recipes/'+ id);
        recipeRef.once('value', (snapshot) => {
          console.log('recipe');
          console.log(snapshot.key);
          this.setState({ recipeName: snapshot.val().recipeName,
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
        console.log(recipeRef);
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
                <Form onSubmit={this.handleSubmit}>
             <Row>
                 <Col><FormGroup>

          <Input type="text" name="name" id="recipeName" placeholder="Recipe Name" bsSize="lg"/>
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
            <Button color="danger" href="\recipe\show\asda">Cancel</Button> <Button type="submit">Submit</Button>
            </Col>
        </Row>
        
        </Form>
        </Container>
        </div>
    );
  }
}

export default withRouter(RecipeContainer);
