import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, fetchProductsStart, setProduct } from './products.actions'; 
import productsTypes from './../Products/products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleFetchProduct } from './products.helpers';
import { auth } from './../../firebase/utils';

export function* addProduct( { payload } ) {

    try{
        const timeStamp = new Date();
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timeStamp
        });
        yield put(fetchProductsStart());
    } catch(err){
        //console.log(err);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload }) {
    try{
        //yield makes sure we can await for the response from the helperfunction
        const products = yield handleFetchProducts(payload);
        //it takes the given data and uses the action setProducts to set the products
        //into the store
        yield put(
            setProducts(products)
        );
    } catch(err) {
        // console.log(err);
    }
}

export function* onFetchProductsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }){
    try{
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        )
    } 
    catch(err){
        //console.log();
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({payload}) {
    try{
        //returns the product we are looking for, note the payload is the productID
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product)
        );

    } catch(err){
        // console.log(err);
    }
}

export function* onFetchProductStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart)
    ])
}