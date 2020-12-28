import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';

//this is our state object, with a user object from out state
export default combineReducers({
    user: userReducer,
    productsData: productsReducer
});