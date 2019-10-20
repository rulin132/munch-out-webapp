import React, { Component } from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Container, CardBody, CardTitle, CardText, Card, Button, Row, Col} from 'reactstrap';
import Ingredients from './Ingredients';
import Method from './Method';

import RecipeDeleteModal from "../../RecipeDeleteModal";
import { deleteRecipe } from "../../../../store/actions/recipeActions"

class RecipeContainer extends Component {
  state = {
    recipe: {}
  }

  constructor(props) {
    super(props);
    this.recipeRef = null;

    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount(){
    // let id = this.props.match.params.id;
    // const userId = localStorage.getItem(appTokenKey);

    // this.recipeRef = firebase.database().ref('recipes/'+ id);
    // this.recipeRef.once('value', (snapshot) => {
    //   const recipe = snapshot.val();
    //   this.setState({ recipe: snapshot.val() });
    // });

   
  }

  toggleDelete = () => {
      console.log('toggle delete');
  }

  handleDelete(id) {

    this.props.deleteRecipe(id);
    this.props.history.push("/recipes");
  
  }
  render() {
    const recipe = this.props.recipe;
    const recipeId = this.props.recipeId;
if (recipe && recipe.recipeName) {
  console.log('recipe', recipe);
    return (
      <div>
      <RecipeDeleteModal recipeId={this.props.recipeId} isOpen={this.state.showDeleteModal} toggle={this.toggleDelete.bind(this)} handleDelete={this.props.handleDelete} />
      <Container>
        <Row className="mt-5">
          <Col md="10">
            <h1>{recipe.recipeName}</h1>
            <span className="small">By {recipe.authorName}</span>
            <div>
                    <Button className="mr-4" color="success" href={"/recipe/" + recipeId + "/edit/"}>Edit Recipe</Button>
                    <Button color="danger" onClick={this.toggleDelete.bind(this)}>Delete Recipe</Button>
            </div>
          </Col>
          <Col >
                {/* <img className="chicken-image float-right" src={require("assets/images/chicken-leek-and-sour-cream-pie-97020-1.jpeg")} width="160" height="160" alt="chicken" /> */}
            </Col>
        </Row>
        
      </Container>
      <div className="card-deck">
        <Card>
            <CardBody>
                <Ingredients ingredients={recipe.ingredients} />
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <Method methods={recipe.methods} />
            </CardBody>
        </Card>
    </div>
    <div className="card-deck mt-5">
    <Card>
        <CardBody>
        <CardTitle>Notes</CardTitle>
        <CardText>{recipe.notes}</CardText>
        <CardText><small className="text-muted">Last updated {/*moment(recipe.createdAt).format('DD/MM/YYYY')*/}  mins ago</small></CardText>
        </CardBody>
    </Card>
    </div>
        
        
        </div>
    )
//     return  (
//       <div>
//     <Container>

//         {typeof categories === 'object' && Object.keys(categories).map((key) => <span className="badge badge-pill badge-primary p-3 m-1" key={key}>{categories[key]}</span>)}
//         {/* <CookingTimes times={recipe.prepTime}/> */}
//         <div className="card-deck">
//         <Card>
//             <CardBody>
//                 <Ingredients ingredients={recipe.ingredients} />
//             </CardBody>
//         </Card>
//         <Card>
//             <CardBody>
//                 <Method methods={recipe.methods} />
//             </CardBody>
//         </Card>
//     </div>
//     <div className="card-deck mt-5">
//     <Card>
//         <CardBody>
//         <CardTitle>Notes</CardTitle>
//         <CardText>{recipe.notes}</CardText>
//         <CardText><small className="text-muted">Last updated 0 mins ago</small></CardText>
//         </CardBody>
//     </Card>
//     </div>
   
// </Container>
// </div>
// )
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id

  const recipes = state.firestore.data.recipes;
  console.log(state.firestore);
  const recipe = recipes ? recipes[recipeId] : null;

  return {
      recipeId,
      recipe,
      categories: state.firestore.data.categories,
      auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe)) ,
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
      { collection: 'categories', orderBy: ['createdAt', 'desc'] },
      { collection: 'recipes' }
  ])
)(RecipeContainer);
