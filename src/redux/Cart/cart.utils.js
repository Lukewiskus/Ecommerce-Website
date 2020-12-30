export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === nextCartItem.documentID
    );
    //this will now return true or false if it exists or not
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantityIncrement = 1;
    const currentItemExists = existingCartItem({prevCartItems,nextCartItem});
    //currentItemExists returns a boolean if it is in the prevCartItems array,
    // if its true, it increments its quantity value by 1
    if(currentItemExists) {
        return prevCartItems.map(cartItem=>
            cartItem.documentID === nextCartItem.documentID
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
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ]
};