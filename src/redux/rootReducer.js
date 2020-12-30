import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';

//this is our state object, with a user object from out state
export default combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer
});