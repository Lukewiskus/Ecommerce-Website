//a redux action is an object with a type and a paylaod
import userTypes from './user.types';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});