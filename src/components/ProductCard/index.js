import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import Button from './../forms/Button';
import './styles.scss';

const mapState = state => ({
    product: state.productsData.product
});

const configAddToCardBtn = {
    type: 'button'
}

const ProductCard = ({}) => {

    const { product } = useSelector(mapState);
    const dispatch = useDispatch();
    const { productID } = useParams();
    
    const { 
        productName,
        productThumbnail,
        productPrice,
        productDescription,
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(setProduct({}))
        }

    }, []);

    return(
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            ${productPrice}
                        </span>      
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCardBtn}>
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML={{__html: productDescription}} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductCard;