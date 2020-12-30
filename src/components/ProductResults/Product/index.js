import React from 'react';
import Button from './../../forms/Button';
import { Link } from 'react-router-dom';


const Product = ({ productThumbnail,
    productName,
    productPrice,
    documentID
     }) => {
    if(!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null;


    const configAddToCartBtn = {
        type: 'button'
    }
    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                <img src={productThumbnail} alt={productName} />
                </Link>
            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                        <Link to={`/product/${documentID}`}>
                            {productName}
                        </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                        ${productPrice}
                        </span>
                        
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn}>
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Product;