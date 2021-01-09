import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import Button from './../../components/forms/Button';
import { addProduct } from './../../redux/Cart/cart.actions';
import './styles.scss';

const mapState = state => ({
    product: state.productsData.product
});

const configAddToCardBtn = {
    type: 'button'
}


const ProductDetails = ({}) => {

    const { product } = useSelector(mapState);
    const history = useHistory();
    const dispatch = useDispatch();
    const { productID } = useParams();
    
    const { 
        productName,
        productThumbnail,
        productPrice,
        productDescription,
    } = product;

    const handleAddToCart = (product) => {
        if(!product) return;
        dispatch(addProduct(product))
        history.push('/cart')
    }

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
                <img src={productThumbnail} alt="thumbnail"/>
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
                    
                    </li>
                    <li>
                        <table className="bottomText" border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <Button id="button" {...configAddToCardBtn} onClick={() => handleAddToCart(product)}>
                                            Add To Cart
                                        </Button>
                                    </td>
                                    <td>
                                        Or
                                    </td>
                                    <td>
                                    <h3 className="backArrow" onClick={() => history.goBack()}>
                                        Return
                                    </h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML={{__html: productDescription}} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductDetails;