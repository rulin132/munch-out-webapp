import authReducer from './authReducer';
import recipeReducer from './recipeReducer';
import categoryReducer from './categoryReducer';

import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    recipe: recipeReducer,
    category: categoryReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;