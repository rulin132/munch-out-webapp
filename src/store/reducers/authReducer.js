const initState = {}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login Error')
            return {
                ...state,
                authError: 'login failed'
            }
        case 'LOGIN_SUCCESS':
        console.log(action.credentials);
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout successful');

            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');

            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            
            return {
                ...state,
                authError: action.err.message
            }
        case 'SEND_PASSWORD_RESET_EMAIL_SUCCESS':
            console.log('Sent Password Reset email success');
            
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;