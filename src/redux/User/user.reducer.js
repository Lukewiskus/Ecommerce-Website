import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    signUpError: [],
    signUpSuccess: false,
    resetPasswordSuccess: false,
    resetPasswordError: []
};

const userReducer = (state=INITIAL_STATE, action) => {
    //a switch statement like in class
    switch(action.type) {
        case userTypes.SET_CURRENT_USER:
            // if userTypes calls set_current_user, then unrap the state and set currentUser to the payload of the state
            return {
                ...state,
                currentUser: action.payload
            }
        case userTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                signInSuccess: action.payload
            }
        case userTypes.SIGN_UP_ERROR:
            return{
                ...state,
                signUpError: action.payload
            }
        case userTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpSuccess: action.payload
            }
        case userTypes.RESET_PASSWORD_ERROR:
            return{
                ...state,
                resetPasswordError: action.payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                resetPasswordSuccess: action.payload
            }
        case userTypes.RESET_AUTH_FORMS:
            return{
                signInSuccess: false,
                signUpError: [],
                signUpSuccess: false,
                resetPasswordSuccess: false,
                resetPasswordError: []
            }
        //else return the state
        default: 
            return state;
    }
};

export default userReducer;
