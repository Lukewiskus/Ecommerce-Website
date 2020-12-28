import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, fetchProductsStart } from './products.actions'; 
import productsTypes from './../Products/products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers';
import { auth } from './../../firebase/utils';

export function* addProduct( { payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}) {

    try{
        const timeStamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
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

export function* fetchProducts() {
    try{
        //yield makes sure we can await for the response from the helperfunction
        const products = yield handleFetchProducts();
        //it takes the given data and uses the action setProducts to set the products
        //into the store
        console.log("sdfdsf")
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

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}