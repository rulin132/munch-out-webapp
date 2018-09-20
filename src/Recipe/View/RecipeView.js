import React, {Component} from "react";
import { Container, CardBody, CardTitle, CardText, Card, Button, Navbar, Input, Form, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Navigation from '../../Navigation';
import Ingredients from './Ingredients';
import Method from './Method';
import CookingTimes from './CookingTimes';

class RecipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
          };

        this.toggleDelete = this.toggleDelete.bind(this);
    }

    toggleDelete() {
        this.setState({
            modal: !this.state.modal
        });
    }
 

    render() {
        let recipeId = this.props.id;
        const recipe = this.props.recipe;
        const recipeName = recipe.recipeName;

        let times = {
            prep: {
                hours: 1,
                minutes: 20
            },
            cooking:  {
                hours: 2,
                minutes: 29
            },
        };
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Delete Recipe</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this recipe?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.handleDelete(recipeId)}>Delete Recipe</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Navigation authenticated={this.props.authenticated} />
                <Container>
                    <Navbar color="light" light>
                        <Form inline>
                            <Input className="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <Button outline color="success" className="my-2 my-sm-0">Search</Button>
                        </Form>
                    </Navbar>
                    <Row>
                        <Col md="10">
                            <h1>{recipeName}</h1>
                            <div>
                                <Button color="success" href={"/recipe/" + recipeId + "/edit/"}>Edit Recipe</Button>
                                <Button color="danger" onClick={this.toggleDelete}>Delete Recipe</Button>
                            </div>
                        </Col>
                        <Col >
                            <img className="chicken-image float-right" src={require("../../assets/images/chicken-leek-and-sour-cream-pie-97020-1.jpeg")} width="160" height="160" alt="chicken" />
                        </Col>
                    </Row>
                    <CookingTimes times={times}/>
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
                    <CardText><small className="text-muted">Last updated {recipe.createdAt} mins ago</small></CardText>
                    </CardBody>
                </Card>
                </div>
               
            </Container>
            </div>
        );
    }
}

export default RecipeView;
