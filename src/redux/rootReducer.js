import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import ordersReducer from './Orders/orders.reducers'
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';

//this is our state object, with a user object from out state
export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer,
});


//you can add more to the whitelist if there is other data you want to presist past sessions
const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
};

export default persistReducer(configStorage, rootReducer);