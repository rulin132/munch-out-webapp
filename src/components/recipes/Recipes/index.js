import React, { Component } from 'react'

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import Recipes from "./Recipes.ui"

class RecipesContainer extends Component {
    render(){
        const { recipes, auth } = this.props;

        if (!auth.uid) {
            return <Redirect to='/login' />
        }
        
        return <Recipes authenticated={this.props.authenticated} recipes={recipes} />;
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