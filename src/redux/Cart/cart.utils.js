export const existingCartItem = ({
    prevCartItems,
    currentCartItem
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === currentCartItem.documentID
    );
    //this will now return true or false if it exists or not
};

export const handleAddToCart = ({
    prevCartItems,
    currentCartItem
}) => {
    const quantityIncrement = 1;
    const currentItemExists = existingCartItem({prevCartItems,currentCartItem});
    //currentItemExists returns a boolean if it is in the prevCartItems array,
    // if its true, it increments its quantity value by 1
    if(currentItemExists) {
        return prevCartItems.map(cartItem=>
            cartItem.documentID === currentCartItem.documentID
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantityIncrement
            } : cartItem
        )
    }
    //if it is not in cart, it just adds it to the cart with a quantity of 1
    return [
        ...prevCartItems,
        {
            ...currentCartItem,
            quantity: quantityIncrement
        }
    ]
};

export const handleRemoveCartItem = ({
    prevCartItems,
    currentCartItem
}) => {
    //only returns the cart items that do not match document ids with the one we want to remove
    return prevCartItems.filter(item => item.documentID !== currentCartItem.documentID);

}

export const handleReduceCartItem = ({
    prevCartItems,
    currentCartItem
}) => {
    const quantityIncrement = 1;
    const currentItemExists = existingCartItem({prevCartItems,currentCartItem});
    if(currentCartItem.quantity === 1) {
        return prevCartItems.filter(item => item.documentID !== currentCartItem.documentID);      
    }
    if(currentItemExists) {
        return prevCartItems.map(cartItem=>
            cartItem.documentID === currentCartItem.documentID
            ? {
                ...cartItem,
                quantity: cartItem.quantity - quantityIncrement
            } : cartItem
        )
    }
}