import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null
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
        //else return the state
        default: 
            return state;
    }
};

export default userReducer;
