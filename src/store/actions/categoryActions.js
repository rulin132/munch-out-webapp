export const createCategory = (categoryText) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // async call here!!!
        const firestore = getFirestore();
       
        const authorId = getState().firebase.auth.uid;

        firestore.collection('categories').add({
            ...categoryText,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'CREATE_CATEGORY', categoryText });
        }).catch((err) => {
            dispatch({ type: 'CREATE_CATEGORY_ERROR', err })
        })
        
    }
}

export const deleteCategory = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('categories').update({
            [id]: null
          }).then(() => {
              dispatch({ type: 'DELETE_CATEGORY', id });
          }).catch((err) => {
              dispatch({ type: 'DELETE_CATEGORY_ERROR', err })
          });
    }
}