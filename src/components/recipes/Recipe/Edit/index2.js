import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createRecipe, editRecipe }
        from '../../../../store/actions/recipeActions'
import { Redirect } from 'react-router-dom'
import {Container, Alert, Fade} from 'reactstrap';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import {Form, FormGroup, Label, Input, Row, Col, Button, FormFeedback}
        from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
// import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

import CookingTimes from './CookingTimes';
import Ingredients from './Ingredients/';
import Methods from './Methods/';
// import { extname, trimExt } from 'upath';
import Select from 'react-select';

class RecipeContainer extends Component {
    state = {
        category: '',
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

    constructor(props, context) {
      super(props, context);
    }
    UNSAFE_componentWillMount() {
        console.log("ComponentWillMount");
        const id = this.props.match.params.id;
        console.log("Will fetch expert with id", id);

        const {recipe} = this.props;
  console.log('RECIPE', this.props);
        if (recipe) {
          console.log('RECIPE', recipe);
          this.setState({recipeName: recipe.recipeName});
        }
        // this.props.fetchExpert(id);
      }
    handleAddIngredient = (text) => {
        this.setState({
            ingredients: [

            ]
        })
    }

    componentWillRecieveProps({ recipe }) {

        this.setState({recipeName: recipe.recipeName});
    }
    handleIngredientsChange = (ingredients)  => {
        this.setState({ingredients: ingredients});
    }
    handleCookingTimesChange(cookingTimes) {
        this.setState({cookingTimes: cookingTimes});
    }
    handleMethodsChange = (methodSteps) => {
        this.setState({methods: methodSteps});
    }


    handleChange = (methodSteps) => {
        this.setState({methods: methodSteps});
    }
    handleRemoveIngredient = (id) => {
       console.log('remove', id);
    }

    handleAddMethod  = () => {
        console.log('add method');
    }

    handleRemoveMethod = (id) => {
        console.log('remove', id);
    }

    getPageHeading() {
        //const recipe = (this.props.recipe && this.props.recipe.recipeName ? this.props.recipe : this.state);
        if (this.props.recipeId) {
            return <h1>Edit Recipe</h1>;
        }

        return <h1>Add Recipe</h1>;
    }

    async handleUploadSuccess (filename) {
        // try {
        //     let { bucket, fullPath } = await firebase.storage().ref('images').child(filename).getMetadata();

        //     let downloadURL = await firebase.storage().ref('images').child(filename).getDownloadURL();

        //     let { uid, email, displayName } = await firebase.auth().currentUser;

        //     let newPhoto = {
        //         url: downloadURL,
        //         userName: displayName,
        //         userId: uid,
        //         email,
        //         bucket,
        //         fullPath
        //     }
        //     console.log('newPhoto', newPhoto);


        //     this.setState({image:newPhoto});
        // }

        // catch(err) {
        //     console.error(err);
        // }
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

        handleProgress = (progress) => this.setState({progress});

        handleUploadError = (error) => {

        this.setState({isUploading: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.props.recipeId) {
            this.props.editRecipe(this.state);
        } else {
            this.props.createRecipe(this.state);
        }



        this.props.history.push("/recipe/view/" + this.props.recipeId);

    }
    handleChange = (e) => {
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }
  render() {
      const { auth, categories } = this.props;

        const recipe = (this.props.recipe && this.props.recipe.recipeName ? this.props.recipe : this.state);

      const pageHeading = this.getPageHeading();

        const categoryOptions = categories && categories.map((category) => {
            return {
                value: category.id,
                label: category.text
            }
        });
console.log(recipe);

      const { selectedOption } = recipe.category;
      const newImageUpload = (<div>
          <FontAwesomeIcon size="5x" color="#2a99d8" icon={faCloudUploadAlt} />
      <p>Try dropping an image here, or click to select an image to upload.</p>
      </div>
      );

      // if (!auth.uid) {
      //       return <Redirect to='/login' />
      // }
console.log('this.state',this.state);
console.log('this.props',this.props);
    return (
      <div>
            <Container>
                {pageHeading}

                {this.state.displayFormError && (<Fade><Alert color="danger">{this.state.displayFormError}</Alert></Fade>)}

                <Form onSubmit={this.handleSubmit}>
             <Select
             name="category"
        value={selectedOption}
        isMulti
        options={categoryOptions} />
            <Row>
                <Col><FormGroup>

         <Input
           type="text"
           name="name"
           id="recipeName"
           placeholder="Recipe Name"

           onChange={this.handleChange}
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
  {/* <CustomUploadButton
    hidden
    accept="image/*"
    storageRef={firebase.storage().ref('images/recipes')}
    onUploadStart={this.handleUploadStart}
    onUploadError={this.handleUploadError}
    onUploadSuccess={this.handleUploadSuccess}
    onProgress={this.handleProgress}
  >Select File to Upload
  </CustomUploadButton> */}</label>
   </Col>
</Row>

<CookingTimes cookingTimes={this.state.cookingTimes} onCookingTimesChange={() => this.handleCookingTimesChange}  />

<Row className="mt-5">
   <Col className="col-12 col-lg-6">
       <Ingredients items={this.state.ingredients} onIngredientsChange={this.handleIngredientsChange} onRemove={this.handleRemoveIngredient} />
   </Col>
   <Col className="col-12 col-lg-6">
       <Methods items={this.state.methods} onAddMethod={this.handleAddMethod} onMethodsChange={this.handleMethodsChange} onRemove={this.handleRemoveMethod} />
   </Col>
</Row>
<Row className="mt-5">
   <Col>
   <Label>Notes</Label>
   <Input type="textarea" name="notes" id="notes" onChange={ this.handleChange } value={ this.state.notes } /></Col>
</Row>

       <Row className="mt-5">
           <Col>
           <Button color="danger" href={'/recipe/show/' + this.state.id}>Cancel</Button> <Button type="submit">Submit</Button>
           </Col>
       </Row>

       </Form>
        </Container>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const recipeId = ownProps.match.params.id

    const recipes = state.firestore.data.recipes;
    console.log(state.firestore);
    const recipe = recipes ? recipes[recipeId] : null;
const recipeName = recipe ? recipe.recipeName : null;

    return {
      initialValues: {
      recipeName: recipeName
    },
        recipeId,
        recipe,
        projects: state.firestore.ordered.projects,
        categories: state.firestore.ordered.categories,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe)) ,
        editRecipe: (recipe) => dispatch(editRecipe(recipe)) ,
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'categories' },
        { collection: 'recipes' }
    ])
)(RecipeContainer);
