import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from "../../redux/Products/products.actions";
import LoadMore from './../Loadmore';
import Product from './Product';
import FormSelect from './../forms/FormSelect';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    //useParams lets you deconstruct variables to use elsewhere
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    
    //products is a objectm so you have to destucture it from the objext to use it
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        console.log(filterType);
        dispatch(fetchProductsStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/products/${nextFilter}`);
    };



    if(!Array.isArray(data)) return null;

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
        )
      };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    }

    if(data.length < 1){
        return (
            <div className="noResults">
                <h1>
                    Browse Products
                </h1>
                <FormSelect {...configFilters} />
                <p>
                    No Search Results
                </p>
            </div>
        );
    }
    return(
        <div className="products">
            <h1>
                Browse Products
            </h1>

            <FormSelect {...configFilters} />

            <div className="productResults">
            {data.map((products, index) => {
                const { productThumbnail, productName, productPrice } = products;
                //this check makes sure we have all three important components
                if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                
                const configProduct = {
                    productThumbnail,
                    productName,
                    productPrice
                };
                return(
                    <Product {...configProduct} />
                );
            })}
            </div>
            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )}
             
        </div>
    );
};

export default ProductResults;