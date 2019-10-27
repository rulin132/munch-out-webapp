import history from '../../history';

export const createRecipe = (recipe) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // async call here!!!
        const firestore = getFirestore();
       

        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
console.log(profile);
        firestore.collection('recipes').add({
            ...recipe,
            authorName: profile.displayName,
            //  authorFirstName: profile.firstName,
            //  authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'CREATE_RECIPE', recipe });
        }).then(() => {
            console.log('redirect');
            dispatch(() => {history.push("/recipes/")});
        }).catch((err) => {
            dispatch({ type: 'CREATE_RECIPE_ERROR', err })
        })
        
    }
}

export const editRecipe = (recipe) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // async call here!!!
        const firestore = getFirestore();
       

        //const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('recipes').doc(recipe.id).update({
            ...recipe,
            // authorFirstName: profile.firstName,
            // authorLastName: profile.lastName,
            authorId: authorId,
            updatedAt: new Date()
      }).then(() => {
            dispatch({ type: 'EDIT_RECIPE', recipe });
        }).then(() => {
            console.log('redirect');
            dispatch(() => {history.push("/recipe/show/" + recipe.id)});
        }).catch((err) => {
            dispatch({ type: 'EDIT_RECIPE_ERROR', err })
        })
        
    }
}

export const deleteRecipe = (recipeId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        let firestore = getFirestore();
        firestore.collection('recipes').doc(recipeId).delete().then(() => {
            dispatch({ type: 'DELETE_RECIPE', recipeId });
        }).then(() => {
            console.log('redirect');
            dispatch(() => {history.push("/recipes/")});
        }).catch((err) => {
            dispatch({ type: 'DELETE_RECIPE_ERROR', err })
        });
    }
}

export const searchForRecipe = (queryText) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        let query = firestore
            .orderByChild("recipeName")
            .startAt(queryText)
            .endAt(queryText + "\uf8ff");

        query.on("value", (snapshot) => {
            let results = [];

            snapshot.forEach(s => {
                results.push({ name: s.val().recipeName, id: s.key });
            });

            dispatch({ type: 'GET_RESULTS', results });
      });  
    }
}

export const uploadRecipeImage = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // const firestore = getFirestore();

        
    }
}