const initState = {
    categories: [
        {id: '1', text: 'help me find peach', content: 'Go to the castle and save peach.'},
        {id: '2', text: 'collect all the stars', content: 'Use your head and hit those boxes.'},
        {id: '3', text: 'egg hunt with yoshi', content: 'Grab those eggs!!!'}
    ]
}


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CATEGORY_ERROR':
            console.log('Error creating category')
            return {
                ...state,
                authError: 'login failed'
            }
        case 'CREATE_CATEGORY':
            console.log('created category');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;