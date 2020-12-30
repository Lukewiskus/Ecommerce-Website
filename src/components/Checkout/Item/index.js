import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleRemoveCartItem } from '../../../redux/Cart/cart.utils';
import { removeCartItem, addProduct,reduceCartItem } from './../../../redux/Cart/cart.actions';

const Item = (product) => {
    
    const dispatch = useDispatch();

    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID
    } = product;
    
    const handleRemoveItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        )
    }

    const handleRemoveProduct = (product) => {
        dispatch(
            reduceCartItem(product)
        )
    }
    
    return(
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName} />
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="arrow"  onClick={() => handleRemoveProduct(product)}>
                            {`<  `}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span  className="arrow" onClick={() => handleAddProduct(product)}>
                            {`  >`}
                        </span>
                    </td>
                    <td>
                        ${productPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={() => handleRemoveItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Item;