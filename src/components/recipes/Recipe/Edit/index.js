import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createRecipe, editRecipe }
        from '../../../../store/actions/recipeActions'
import {Container, Alert, Fade} from 'reactstrap';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import {Form, FormGroup, Label, Input, Row, Col, Button, FormFeedback}
        from 'reactstrap';

import CookingTimes from './CookingTimes';
import Ingredients from './Ingredients/';
import Methods from './Methods/';
import Select from 'react-select';

class RecipeContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            recipe: {
                recipeName: props.recipe ? props.recipe.recipeName : '',
                category: props.recipe ? props.recipe.category : '',
                notes: props.recipe ? props.recipe.notes : '',
                cookingTimes: {
                    prepTime: {
                        hours: props.recipe && props.recipe.cookingTimes && props.recipe.cookingTimes.prepTime ? 
                            props.recipe.cookingTimes.prepTime.hours : 
                            '',
                        minutes: props.recipe && props.recipe.cookingTimes && props.recipe.cookingTimes.prepTime ? 
                            props.recipe.cookingTimes.prepTime.minutes : 
                            '',
                    },
                    cookTime: {
                        hours: props.recipe && props.recipe.cookingTimes && props.recipe.cookingTimes.prepTime ? 
                            props.recipe.cookingTimes.cookTime.hours : 
                            '',
                        minutes:props.recipe && props.recipe.cookingTimes && props.recipe.cookingTimes.prepTime ? 
                            props.recipe.cookingTimes.cookTime.minutes : 
                            '',
                    },
                },
                ingredients: props.recipe ? props.recipe.ingredients : [],
                methods: props.recipe ? props.recipe.methods : [],
                createdAt: '',
                updatedAt: '',
            },
            isSubmitted: false,
            displayFormError: false,
            formErrors: {
                name: ''
            },
        };

        this.handleCookingTimesChange = this.handleCookingTimesChange.bind(this);

        console.log(this.state.recipe);
      }

      componentWillReceiveProps(nextProps) {
          console.log(nextProps);
          if (nextProps.recipe) {
        this.setState({
            recipe: nextProps.recipe,
        });
    }
    }

      //   componentWillReceiveProps = (nextProps) => {
    
    //     this.setState({
    //       recipe: {
    //         recipeName: nextProps.recipe.recipeName,
    //         category: nextProps.recipe.category,
    //       }
    //     });
    //   }
    // componentDidMount() {
    //     const {recipe} = this.props;

    //     if (recipe) {
    //       this.setState({recipe: recipe});
    //     }
    // }

    handleAddIngredient = (text) => {
        this.setState({
            ingredients: [

            ]
        })
    }

    // componentDidUpdate({ recipe }) {

    //     this.setState({recipe: recipe});
    // }
    handleIngredientsChange = (ingredients)  => {
        this.setState({
            recipe: {
              ...this.state.recipe,
              ingredients: ingredients
            }
          });
    }
    handleCookingTimesChange(cookingTimes) {
        console.log(cookingTimes);
        this.setState({
            recipe: {
              ...this.state.recipe,
              cookingTimes: cookingTimes
            }
          });
    }
    handleMethodsChange = (methodSteps) => {
        this.setState({
            recipe: {
              ...this.state.recipe,
              methods: methodSteps
            }
          });
        // this.setState({methods: methodSteps});
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
        if (this.props.recipeId) {
            return <h1>Edit Recipe</h1>;
        }

        return <h1>Add Recipe</h1>;
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

        handleProgress = (progress) => this.setState({progress});

        handleUploadError = (error) => {

        this.setState({isUploading: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.props.recipeId) {
            console.log('this.state.recipe', this.props.recipeId);
            // this.state.recipe.id = this.props.recipeId;
            this.setState({recipe: {
                    ...this.state.recipe, 
                    id: this.props.recipeId
                }
            });

            this.props.editRecipe(this.state.recipe, function () {
                
            });
        } else {
            this.props.createRecipe(this.state.recipe);
        }

        // this.props.history.push("/recipe/show/" + this.props.recipeId);
    }
    handleChangeCategory = (e) => {
        console.log(e);
        this.setState({
            recipe: {
              ...this.state.recipe,
              category: e
            }
          });
    }
    handleChange = (e) => {
  
        this.setState({
            recipe: {
              ...this.state.recipe,
              [e.target.id]: e.target.value
            }
          });
    }
  render() {
    const { categories } = this.props;

    const { recipe } = this.state;

    console.log('---------------');
    console.log(this.state);
    console.log(this.props);
    const pageHeading = this.getPageHeading();

    const categoryOptions = categories && categories.map((category) => {
        return {
            value: category.id,
            label: category.text
        }
    });

    const  selectedOptions = recipe && Array.isArray(recipe.category) ? recipe.category : '';
console.log(recipe);
    return (<div>
        <Container>
            {pageHeading}

            {this.state.displayFormError && (<Fade><Alert color="danger">{this.state.displayFormError}</Alert></Fade>)}

            <Form onSubmit={this.handleSubmit}>
                <Select
                    name="category"
                    id="category"
                    value={selectedOptions}
                    onChange={this.handleChangeCategory}
                    isMulti
                    options={categoryOptions} />
                <Row>
                    <Col>
                        <FormGroup>
                            <Input 
                                type="text"
                                name="name"
                                id="recipeName"
                                placeholder="Recipe Name"
                                defaultValue={recipe.recipeName}
                                onChange={this.handleChange}
                                bsSize="lg"
                                invalid={this.state.isSubmitted && this.state.formErrors.name} />
                            <FormFeedback>Need to give this recipe an awesome name!</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <CookingTimes prepTime={recipe.cookingTimes.prepTime} cookingTime={recipe.cookingTimes.cookingTime} onCookingTimeChange={this.handleCookingTimesChange} />

                <Row className="mt-5">
                    <Col className="col-12 col-lg-6">
                        <Ingredients 
                            items={recipe.ingredients} 
                            onIngredientsChange={this.handleIngredientsChange} 
                            onRemove={this.handleRemoveIngredient} />
                    </Col>
                    <Col className="col-12 col-lg-6">
                        <Methods 
                            items={recipe.methods} 
                            onAddMethod={this.handleAddMethod} 
                            onMethodsChange={this.handleMethodsChange} 
                            onRemove={this.handleRemoveMethod} />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Label>Notes</Label>
                        <Input 
                            type="textarea" 
                            name="notes" 
                            id="notes" 
                            onChange={ this.handleChange } 
                            defaultValue={ recipe.notes } />
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <Button color="danger" href={'/recipe/show/' + this.props.recipeId}>Cancel</Button> 
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
    const recipeId = ownProps.match.params.id

    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[recipeId] : null;

    return {
        recipeId,
        recipe,
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