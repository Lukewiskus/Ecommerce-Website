//a redux action is an object with a type and a paylaod
import userTypes from './user.types';
import { auth, GoogleProvider, handleUserProfile } from './../../firebase/utils';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

//an action is a function that returns an object with a type and payload

export const signInUser = ({ email, password }) => async dispatch => {
       
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    }
    catch(err){
        //console.log
        
    }
};

export const signUpUser = ({ displayName, email, password, confirmPassword}) => async dispatch => {

    if (password !== confirmPassword) {
        const err = ['PASSWORDS DO NOT MATCH'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        });
        return;
    }
    
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email,password);
        
        await handleUserProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        });

    }
    catch(err) {
        //console.log(err);
    }
}   

export const resetPassword = ({ email }) => async dispatch => {
    //integrate with firebase on a submit to send an email to the email entered to attempt to change the password
    const config = {
        //this url is the url the user gets redirected to after redoing their password 
        url: 'http://localhost:3000/login'
    };
    try {
        await auth.sendPasswordResetEmail(email, config)
        //.then means the password was reset    
        .then(() => {
            dispatch({
                type: userTypes.RESET_PASSWORD_SUCCESS,
                payload: true
            });
        })
        //.catch means the password was not reset
        .catch(() => {
            const err = ['Email not found. Please try a different Email'];
            dispatch({
                type: userTypes.RESET_PASSWORD_ERROR,
                payload: err
            });
        })
    }
    catch(err){
        //console.log(err);
    }
}

export const signInWithGoogle = () => async dispatch => {
    try{
        await auth.signInWithPopup(GoogleProvider)
        .then(() => {
            dispatch({
                type: userTypes.SIGN_IN_SUCCESS,
                payload: true
            });
        });
    }
    catch(e){
        //console.log
    }
};

export const resetAllAuthForms = () => async dispatch =>{
    dispatch({
        type: userTypes.RESET_AUTH_FORMS
    }); 
};