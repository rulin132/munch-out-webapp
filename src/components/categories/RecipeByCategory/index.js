import React, { Component } from 'react'

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';
import Recipe from "./Recipe"

class RecipesContainer extends Component {
    render(){
        const { recipes, auth } = this.props;
        const items = recipes;

        console.log(items);
        if (!auth.uid) {
            return <Redirect to='/login' />
        }
        
        return (
             <div>
            <Container>
                {items && items.map((item) => 
                    <Recipe key={item.id} id={item.id} name={item.recipeName}  />
                    )}

                <Row>
                    <Col md="4" className="mx-auto mt-5">
                        <Button href="/recipe/new">Add Recipe</Button>
                        <Button href="/categories">Back to Category List</Button>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.firestore.ordered.recipes,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'recipes', orderBy: ['createdAt', 'desc'] }
    ])
)(RecipesContainer);