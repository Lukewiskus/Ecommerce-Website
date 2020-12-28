import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from './Product';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(fetchProductsStart())
    }, []);

    if(!Array.isArray(products)) return null;

    if(products.length < 1){
        return (
            <div>
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

            <div className="productResults">
            {products.map((products, index) => {
                const { productThumbnail, productName, productPrice } = products;
                //this check makes sure we have all three important components
                if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                
                const configProduct = {
                    productThumbnail,
                    productName,
                    productPrice
                }
                
                return(
                    <Product {...configProduct} />
                );
            })}
            </div>
        </div>
    );
};

export default ProductResults;