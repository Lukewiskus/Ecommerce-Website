import productTypes from './products.types';

const INITIAL_STATE = {
    products: [],
    product: {},
    image: {}
};

const productsReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case productTypes.SET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
        case productTypes.SET_PRODUCT:
            return{
                ...state,
                product: action.payload
            }
        case productTypes.EDIT_PRODUCT_START:
            return{
                ...state,
                product: action.payload
            }
        case productTypes.UPLOAD_IMAGE_START:
            return {
                ...state,
                image: action.payload
            }
        default:
            return state;
    }
};

export default productsReducer;