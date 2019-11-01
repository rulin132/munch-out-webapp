const initState = {}
const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_RECIPE':
            console.log('created recipe', action.recipe);
            return state;
        case 'CREATE_RECIPE_ERROR':
            console.log('create recipe error', action.err);
            return state;
        case 'EDIT_RECIPE':
            console.log('edit recipe', action.recipe);
            return state;
        case 'EDIT_RECIPE_ERROR':
            console.log('error edited recipe', action.recipe);
            return state;
        case 'DELETE_RECIPE':
            console.log('delete recipe', action.recipe);
            return state;
        case 'DELETE_RECIPE_ERROR':
            console.log('error deleting recipe', action.recipe);
            return state;
        case 'GET_RESULTS':
            return {
                data: action,
              };
        case 'LOAD':
           return {
             data: action.data,
           };
        default:
            return state;
    }
}

export default recipeReducer;
