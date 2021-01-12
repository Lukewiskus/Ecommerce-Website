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
        <div className="productDetailWrap">
            <table>
                <tbody>
                    <tr className="imagetr">
                        <td className="image">
                            <img src={productThumbnail} alt="thumbnail"/>
                        </td>
                    </tr>
                    <tr className="textRow">
                        <td className="text">
                            <span>
                                {productName}
                            </span>
                        </td>
                    </tr>
                    <tr className="desc">
                        <td>
                        <span dangerouslySetInnerHTML={{__html: productDescription}} />
                        </td>
                    </tr>
                    <tr className="bottomRow">
                        <td>
                            <h1>
                        ${productPrice}
                        </h1>
                        <Button {...configAddToCardBtn} onClick={() => handleAddToCart(product)}>
                            Add To Cart
                        </Button>
                        <Button id="goBackBTN" onClick={() => history.push('/products')}>
                                Go Back
                        </Button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProductDetails;