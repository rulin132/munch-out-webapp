import React from 'react';
import {Form, FormGroup, Label, Input, Row, Col, Button, FormFeedback} from 'reactstrap';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import firebase, {appTokenKey} from "../../base";

import CookingTimes from './CookingTimes';
import Ingredients from './Ingredients/';
import Methods from './Methods/';
import { extname, trimExt } from 'upath';

class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.recipeId = this.props.recipeId;

        const timeField = {
            hours: '',
            minutes: ''
        }

        this.state = {
            recipeName: '',
            image: {
        		id: '',
        		url: ''
            },
            cookingTimes: {
                prepTime: timeField,
                cookTime: timeField,
            },
            ingredients: [],
            methods: [],
            methodsCount: 0,
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

    isValidForm() {
        if (this.state.formErrors.name) {
            return false;
        }

        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({isSubmitted: true});
        
        if (!this.isValidForm()) {
            this.setState({displayFormError: 'Unable to save due to errors on the form'});

            return;
        }

        let key = null;

        if (typeof this.recipeId !== 'undefined' && this.recipeId.length > 0) {
            key = this.recipeId;

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

    handleUploadSuccess = async (filename) => {
   
            const ext = extname(filename);
            const filenameName = trimExt(filename);
            let { bucket, fullPath } = await firebase.storage().ref('images/recipes').child(filename).getMetadata();
            console.log('bucket', bucket)
            console.log('fullPath', fullPath)
            
            firebase.storage().ref('images/recipes').child('thumb@'+filenameName+'_256x256'+ext).getDownloadURL()
            .then(async (downloadURL) => {
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
                // `url` is the download URL for 'images/stars.jpg'
            });
            
    }

    changeRecipeName = (e) => {
        this.validateName(e);
        this.setState({recipeName:this.state.recipeName});
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

    handleCookingTimesChange(cookingTimes) {
        this.setState({cookingTimes: cookingTimes});
    }

    handleChangeRecipeName = (e) => {
        this.validateName(e);
        this.setState({recipeName: e.target.value});
    }

    handleAddMethod = (methodText) => {
        let methods = this.state.methods;
        
        let methodsCount = this.state.methodsCount + 1;

        this.setState({methodsCount: methodsCount});
        methods.push({
            id: this.state.methodsCount,
            text: methodText});
        this.setState({methods});
    }

    handleChangeMethod = (index, event) => {
         let newMethods = this.state.methods;           // create the copy of state array
         newMethods[index].text = event.target.value    // new value
         
         this.setState({ methods: newMethods });
    }

    handleRemoveMethod = (key) => {
        let array = [...this.state.methods];

        array.splice(key, 1);

        this.setState({
            methods: array
        });
    }

    
    handleAddIngredient = (text) => {
        let ingredients = this.state.ingredients;

        let ingredientsCount = this.state.ingredientsCount + 1;

        this.setState({ingredientsCount: ingredientsCount});
        ingredients.push({
            id: this.state.ingredientsCount,
            text: text});
        this.setState({ ingredients });
    }

    handleChangeIngredient = (index, event) => {
         let newIngredients = this.state.ingredients;           // create the copy of state array
         newIngredients[index].text = event.target.value    // new value
         
         this.setState({ ingredients: newIngredients });
    }

    handleRemoveIngredient = (key) => {
        let array = [...this.state.ingredients];
        
        array.splice(key, 1);

        this.setState({
            ingredients: array
        });
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {

        this.setState({isUploading: false});
    }

    onChangeNotes = (e) => {
        this.setState({notes: e.target.value});
    }

    componentWillMount(){
        let id = this.props.recipeId;
        const userId = localStorage.getItem(appTokenKey);

        if (typeof id !== 'undefined') {
            let recipeRef = firebase.database().ref('users/' + userId + '/recipes/'+ id);
        
            recipeRef.once('value', (snapshot) => {
                const recipe = snapshot.val();
 
                this.setState({ 
                    id: snapshot.key,  
                    recipeName: recipe.recipeName,
                image: {
                    id: '',
                    url: ''
                },
                cookingTimes: recipe.cookingTimes,
                ingredients:recipe.ingredients,
                ingredientsCount: (typeof recipe.ingredients !== 'undefined' && recipe.ingredients.length),
                methods: recipe.methods,
                methodsCount: (typeof recipe.methods  !== 'undefined' &&  recipe.methods.length),
                notes: recipe.notes,
                createdAt: recipe.createdAt,
                updatedAt: recipe.updatedAt });
            });
        }
      }

      
    render() {
        const newImageUpload = (<div>
            <FontAwesomeIcon size="5x" color="#2a99d8" icon={faCloudUploadAlt} />
        <p>Try dropping an image here, or click to select an image to upload.</p>
        </div>
        );

        return (
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
    storageRef={firebase.storage().ref('images/recipes')}
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
       <Ingredients items={this.state.ingredients} onAddMethod={this.handleAddIngredient} onChange={this.handleChangeIngredient} onRemove={this.handleRemoveIngredient} />
   </Col>
   <Col className="col-12 col-lg-6">
       <Methods items={this.state.methods} onAddMethod={this.handleAddMethod} onChange={this.handleChangeMethod} onRemove={this.handleRemoveMethod} />  
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
        );
    }
}

export default RecipeForm;