import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useHistory } from "react-router-dom";

import Button from './../../components/forms/Button';
import Item from './Item';
import './styles.scss';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const Cart = ({}) => {
    const history = useHistory();
    const { cartItems, total } = useSelector(mapState);

    return (
        <div className="checkoutWrap">

            
            <div className="cart">
            {cartItems.length > 0 ? (
                <table border="0" cellpadding="0" cellspacing="0">
                                <h1 className="topText">
                Check Out
            </h1>
                     <tbody>
                         <tr>
                         <table className="checkoutHeader"  border="0" cellpadding="10" cellspacing="0">
                             <tbody>
                                 <tr>
                                     <th>
                                         Product
                                     </th>
                                     <th>
                                         Description
                                     </th>
                                     <th>
                                         Quantity
                                     </th>
                                     <th>
                                         Price
                                     </th>
                                     <th>
                                         Remove
                                     </th>
                                 </tr>
                             </tbody>
                             </table>
                         </tr>
                         <tr>
                             <table border="0" cellPadding="10" cellSpacing="0">
                                 <tbody>
                                     {cartItems.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="itemWrapper">
                                                    <Item {...item} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </tr>
                        <tr>
                            <td>
                            <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td>
                                        <table border="0" cellPadding="10" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                <td>
                                                <h3 id="total">
                                                    Total: ${total}
                                                </h3>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Button onClick={() => history.goBack('/product')}>
                                                Continue Shopping
                                            </Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => history.push('/payment')}>
                                                Checkout
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                ) : (
                 <div className="noItem">
                    <h1 className="topText">
                        Check Out
                    </h1>
                     <p>
                         You have no items in your cart.
                     </p>
                     <Button id="noItemButton"onClick={() => history.push('/products')}>
                         ContinueShopping
                     </Button>
                 </div>
                 ) }
            </div>
        </div>
    );
}
    export default Cart;



