import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart, setProducts } from './../../redux/Products/products.actions.js'
import AddProductModal from './../../components/Modal/AddProductModal';
import EditProductModal from './../../components/Modal/EditProductModal';
import { Link, useHistory, useParams } from 'react-router-dom';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/Loadmore';
import CKEditor from 'ckeditor4-react';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const Admin = props => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [hideProductModal, setHideProductModal] = useState(true);
    const { filterType } = useParams();
    const [hideEditProductModal, setHideEditProductModal] = useState(true);
    const [productCategory, setProductCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');

    const { data, queryDoc, isLastPage } = products;
    
    useEffect(() => {
        console.log(filterType);
        dispatch(fetchProductsStart({ filterType })
        )
        return () => {
            dispatch(setProducts([]))
        }
    }, [filterType]);
    
    const toggleProductModal = ( ) => {
        setHideProductModal(!hideProductModal);
    }
    const configProductModal = {
        hideProductModal,
        toggleProductModal
    };

    const toggleEditProductModal = () => {
        setHideEditProductModal(!hideEditProductModal)
    }

    const configEditProductModal = {
        hideEditProductModal,
        toggleEditProductModal
    }
    const resetForm = () => {
        setHideProductModal(true);
        setProductCategory('');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
        setProductDescription('');
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productDescription
        })
        );
        //to close to modal and reset page to see the new product
        resetForm();
    }
    const handleEditSubmit = e => {
        e.preventDefault();
    }

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/admin/${nextFilter}`);
    };

    const configFilters = {
        defaultValue: filterType,
          options: [{
            name: 'Show All',
            value: ''
          }, {
            name: 'Wallet',
            value: 'wallet'
          }, {
          name: 'Tote Bags',
          value: 'tote-bags'
          }, {
          name: 'Guitar Straps',
          value: 'guitar-straps'
          }, {
          name: 'Belts',
          value: 'belts'
      }, {
          name: 'Other',
          value: 'other'
      }], handleChange: handleFilter
      };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                filterType,
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
                        <h2>
                            Search Your Product Type
                        </h2>
                    <FormSelect {...configFilters} />
                    </li>
                    <li>
                        <Button onClick={() => toggleProductModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>
            <AddProductModal {...configProductModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2>
                            Add new product
                        </h2>
                        <FormSelect
                            required
                            label="Category"
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
                            handleChange={e => setProductCategory(e.target.value)}
                            />
                            
                            <FormInput
                            required
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                            />

                            <FormInput 
                            required
                                label="Main image URL"
                                type="url"
                                value={productThumbnail}
                                handleChange={e => setProductThumbnail(e.target.value)}
                            />

                           <FormInput 
                           required
                                label="Price"
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="1"
                                value={productPrice}
                                handleChange={e => setProductPrice(e.target.value)}
                            />
                            <CKEditor
                            required
                            //on a change, use the setter we made, and the evt.editor.getData() is from the dependicy itself
                            onChange={evt => setProductDescription(evt.editor.getData())}
                            />
                            <Button type="submit">
                                Add product
                            </Button>  
                    </form>
                </div>
            </AddProductModal>

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody> 
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="10">
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
                                                <div className="singleRow">
                                                <tr key={index}>
                                                    <td>
                                                        <img src={productThumbnail} alt="Thumbnail"/>
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
                                                    <td>
                                                    <Link to={`/productedit/${documentID}`}>
                                                        <Button >
                                                            Edit
                                                        </Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                </div>
        
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