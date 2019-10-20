export const signIn = (credentials) => {
    return (dispatch, getState, {
        getFirebase
    }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });
    }
}

export const signInWithGoogle = () => {
    return (dispatch, getState, {
        getFirebase, getFirestore 
    }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then((credentials) => {
            firestore.collection('users').doc(credentials.user.uid).set({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                initials: credentials.firstName[0] + credentials.lastName[0]
            })
            dispatch({ type: 'LOGIN_SUCCESS', credentials })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const sendPasswordResetEmail = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().sendPasswordResetEmail(email).then(() => {
            dispatch({ type: 'SEND_PASSWORD_RESET_EMAIL_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            // resp.user
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({
                type: 'SIGNUP_SUCCESS'
            });
        }).catch(err => {
            dispatch({
                type: 'SIGNUP_ERROR',
                err
            })
        })
        
    }
}