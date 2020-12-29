import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions.js'
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/Loadmore';
import './styles.scss';

import imagesz from './../../assets/belts-temp.png';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const Admin = props => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const { data, queryDoc, isLastPage } = products;
    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );
    //when no dependencies are passed then it only runs on the first render of the compnent
    }, []);
    
    const toggleModal = () => setHideModal(!hideModal);
    
    const congifModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice
        })
        );
        //to close to modal and reset page to see the new product
        resetForm();
    }

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                startAfterDoc: queryDoc, 
                presistProducts: data
            })
        );
    };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    };

    return(
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <h1>
                            Manage Products
                        </h1>
                    </li>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>
            <Modal {...congifModal}>

                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2>
                            Add new product
                        </h2>
                        <FormSelect
                            label="Category"
                            options = {[
                            {   value: '',
                                name: "Select Category"
                            }, {
                                value: "wallet",
                                name: "Wallet"
                            }, {
                                value: "guitar-straps",
                                name: "Guitar Straps"
                            }, {
                                value: "tote-bags",
                                name: "Tote Bags"
                            }, {
                                value: "belts",
                                name: "Belts"
                            }, {
                                value: "other",
                                name: "Other"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                            />
                            
                            <FormInput
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                            />

                            <FormInput 
                                label="Main image URL"
                                type="url"
                                value={productThumbnail}
                                handleChange={e => setProductThumbnail(e.target.value)}
                            />

                           <FormInput 
                                label="Price"
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="1"
                                value={productPrice}
                                handleChange={e => setProductPrice(e.target.value)}
                            />
                            <Button type="submit">
                                Add product
                            </Button>  
                    </form>
                </div>
            </Modal>
            
            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody> 
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {(Array.isArray(data) && data.length >0) && data.map((product, index) => {
                                            const { 
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                productCategory,
                                                documentID
                                            } = product;
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={productThumbnail}/>
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ${productPrice}
                                                    </td>
                                                    <td>
                                                        {productCategory}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
        
                                            )
                                        })}
                                    </tbody>
                                    {!isLastPage && (
                                        <LoadMore {...configLoadMore}/>
                                    )}
                                </table>
                            </td>
                        </tr>
                    </tbody>
                
                </table>
            </div>
        </div>
    );
}

export default Admin;