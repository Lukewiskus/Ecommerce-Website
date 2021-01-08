import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, editProductStart } from './../../redux/Products/products.actions';
import Button from './../forms/Button';
import CKEditor from 'ckeditor4-react';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import './styles.scss';

const mapState = state => ({
    product: state.productsData.product
});

const EditProduct = ({}) => {
    const { product } = useSelector(mapState);
    const { editType } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [editCategory, setEditCategory] = useState('');
    const [editName, setEditName] = useState('');
    const [editThumbnail, setEditThumbnail] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const { 
        productName,
        productThumbnail,
        productPrice,
        productDescription,
        productCategory
    } = product;
    
    useEffect(() => {
        
        dispatch(
            fetchProductStart(editType)
        )

        setEditCategory(productCategory)
        setEditName(productName)
        setEditThumbnail(productThumbnail)
        setEditPrice(productPrice)
        setEditDescription(productDescription)

    }, [productName]);
    
    const handleSubmit = e => {
        e.preventDefault();


        dispatch(editProductStart({
            newProductCategory: editCategory,
            newProductName: editName,
            newThumbnail: editThumbnail,
            newProductPrice: editPrice,
            newProductDesc: editDescription,
            documentID: editType
        }))
        history.goBack('/admin');
    }

        
    return (
        <div className="editProductForm">
            <form onSubmit={handleSubmit}>
                <h2>
                    Edit Product
                </h2>
                <Button className="goBackBtn"onClick={() => history.goBack('/admin')}>
                    GoBack
                </Button>
                <FormSelect 
                    label="Category"
                    required
                    options = {[
                    {   value: '',
                        name: "Select Category"
                    }, {
                        value: "Wallet",
                        name: "Wallet"
                    }, {
                        value: "Guitar-Straps",
                        name: "Guitar Straps"
                    }, {
                        value: "Tote-Bags",
                        name: "Tote Bags"
                    }, {
                        value: "Belts",
                        name: "Belts"
                    }, {
                        value: "Other",
                        name: "Other"
                    }]}
                    handleChange={e => setEditCategory(e.target.value)}
                />
                <FormInput
                    label="Name"
                    type="text"
                    value={editName}
                    handleChange={e => setEditName(e.target.value)}
                />
                <FormInput
                    label="Main image URL"
                    type="url"
                    value={editThumbnail}
                    handleChange={e => setEditThumbnail(e.target.value)}
                />
                <FormInput
                        label="Price"
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="1"
                        value={editPrice}
                        handleChange={e => setEditPrice(e.target.value)}
                />
                <CKEditor
                    input="sdf"
                    data = {`${editDescription}`}
                    onChange={evt => setEditDescription(evt.editor.getData())}
                />
                <Button type="submit">
                    Complete Edit
                </Button>  
            </form>
        </div>
    );
}

export default EditProduct;