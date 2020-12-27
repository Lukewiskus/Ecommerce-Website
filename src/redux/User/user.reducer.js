import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    resetPasswordSuccess: false,
    userErr: []
};

const userReducer = (state=INITIAL_STATE, action) => {
    //a switch statement like in class
    switch(action.type) {
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: []
            }

        case userTypes.USER_ERROR:
            return{
                ...state,
                userErr: action.payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                resetPasswordSuccess: action.payload
            }
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return{
                //unwraps all of state and resets the current user to null
                ...state,
                ...INITIAL_STATE
            }
        //else return the state
        default: 
            return state;
    }
};

export default userReducer;
