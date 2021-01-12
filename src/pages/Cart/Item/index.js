import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as HiIcons from 'react-icons/hi';
import * as TiIcons from 'react-icons/ti';
import { handleRemoveCartItem } from '../../../redux/Cart/cart.utils';
import { IconContext } from 'react-icons';
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
                            <HiIcons.HiOutlineChevronLeft/>
                        </span>
                        <span className="quantity">
                            {quantity}
                        </span>
                        <span  className="arrow" onClick={() => handleAddProduct(product)}>
                        <HiIcons.HiOutlineChevronRight/>
                        </span>
                    </td>
                    <td>
                        ${productPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={() => handleRemoveItem(documentID)}>
                            <TiIcons.TiDeleteOutline />
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Item;