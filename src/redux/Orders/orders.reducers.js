import ordersTypes from './orders.types';

const INITIAL_STATE = {
    orderHistory: [],
    completeOrderHistory: [],
    orderDetails: {},
}

const ordersReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            };
        case ordersTypes.SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            }
        case ordersTypes.SET_COMPLETE_ORDER_HISTORY:
            return {
                ...state,
                completeOrderHistory: action.payload
            }
        default:
            return state;
    }
};

export default ordersReducer;