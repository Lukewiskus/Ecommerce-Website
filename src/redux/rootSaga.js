import { all, call } from 'redux-saga/effects';
import userSagas from './User/user.sagas';

//all alows us to resolve effects in parrell, and call
// allows us to call functions

//function* means its a generator function
export default function* rootSaga() {
    yield all([call(userSagas)])
}