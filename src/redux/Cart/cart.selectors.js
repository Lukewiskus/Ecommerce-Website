import { createSelector } from 'reselect';

//its a naming convention to prefix selectors with select

export const selectCartData = state => state.cartData;

export const selectCartItems = createSelector(
    [selectCartData],
    cartData => cartData.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    //it goes into cart items and it adds the all the quantities to then be displayed on our
    //header Cart Area
    cartItems =>
        cartItems.reduce(
            (quantity,cartItem) =>
              quantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (priceTotal, cartItem) =>
        priceTotal + cartItem.quantity * cartItem.productPrice, 0)
);