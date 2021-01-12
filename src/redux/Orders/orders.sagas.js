import ordersTypes from './orders.types';
import { takeLatest, put, call, all, cancelled} from 'redux-saga/effects';
import { handleGetCompleteOrderHistory, handleSaveorder, handleGetUserOrderHistory, handleGetOrder } from './orders.helpers';
import { auth } from './../../firebase/utils';
import { setCompleteOrderHistory, setUserOrderHistory, setOrderDetails } from './orders.actions';


export function* getUserOrderHistory ({ payload }) {
    try{
        const history = yield handleGetUserOrderHistory(payload);
        yield put(
            setUserOrderHistory(history)
        );
    }
    catch(err){
        console.log(err)
    }
}

export function* onGetOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory)
}

export function* getCompleteOrderHistory({ payload }) {
    try{
        const orders = yield handleGetCompleteOrderHistory();

        yield put(
            setCompleteOrderHistory(orders)
        );
    } catch(err){
        //console.log(err)
    }
}

export function* onGetCompleteOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_COMPLETE_ORDER_HISTORY, getCompleteOrderHistory)
}


export function* saveOrder({ payload }) {
    try {
        const timestamp = new Date();
        yield handleSaveorder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamp
        });

    } catch(err) {
        //console.log(err);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder)
};

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(
            setOrderDetails(order)
        )
    } catch(err){
        //console.log(err)
    }
}

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails)
}

export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetOrderHistoryStart),
        call(onGetOrderDetailsStart),
        call(onGetCompleteOrderHistoryStart)
    ])
}