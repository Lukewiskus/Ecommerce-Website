import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './styles.scss';
import FormInput from  './../../../components/forms/FormInput';
import Button from './../../../components/forms/Button';
import { useHistory } from "react-router-dom";
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from './../../../Utils';
import { selectCartTotal,selectCartItemsCount, selectCartItems } from './../../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './../../../redux/Cart/cart.actions';
import { saveOrderHistory } from './../../../redux/Orders/orders.actions';


// you need this initial state so it doesnt error out
const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: 'asdf',
    postal_code: ''
};

const mapState = createStructuredSelector ({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems
});

const PaymentDetails = () => {
    const { total , itemCount, cartItems } = useSelector(mapState);
    const elements = useElements();
    const stripe = useStripe();
    const history = useHistory();
    const dispatch = useDispatch();
    const [billingAddress, setBillingAddress] = useState({...initialAddressState});
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState});
    const [recipientName, setRecipientName] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    useEffect(() => {
        if(itemCount < 1) {
            //make this into a confirmation page
            history.push('/dashboard');
        }
    }, [itemCount])

    const handleShipping = evt => {
        const { name, value } = evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    };

    const handleBilling = evt => {
        const { name, value } = evt.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        });
    };

    const handleFormSubmit = async evt => {
        evt.preventDefault();
        //this gets the card info from the form we also imported
        const cardElement = elements.getElement('card');


            //posting to the firebase function and sending the data stored on front end
            apiInstance.post('/payments/create', {
                //expects it in cents
                amount: total * 100,
                shipping: {
                    name: recipientName,
                    address: {
                        ...shippingAddress
                    }
                }
                //we get back the clientSecret after the API did its thing
            }).then(({ data: clientSecret }) => {
                stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: nameOnCard,
                        address: {
                            ...billingAddress
                        }
                    }
                }).then(({ paymentMethod }) => {

                    stripe.confirmCardPayment(clientSecret, {
                        payment_method: paymentMethod.id
                    })
                    //paymentIntent is the details of the transaction if it is successful
                    .then(({ paymentIntent }) => {
                       
                        const configOrder = {
                            orderTotal: total,
                            orderItems: cartItems.map(item => {
                                const { documentID, productThumbnail, productName, productPrice, quantity } = item
                                return {
                                    documentID, 
                                    productThumbnail, 
                                    productName, 
                                    productPrice, 
                                    quantity
                                }
                            })

                        }
                       
                        dispatch(saveOrderHistory(configOrder))
                        dispatch(clearCart())
                    })
                })
            });
        };

    const configCardElemet = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    };

    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>
                <div className="group">
                    <h2>
                        Shipping Address
                    </h2>
                    <FormInput 
                        required
                        placeholder="Recipient  Name"
                        name="recipientName"
                        handleChange={evt => setRecipientName(evt.target.value)}
                        value={recipientName}
                        type="text"
                    />

                        <FormInput 
                        placeholder="Line 1"
                        name="line1"
                        value={shippingAddress.line1}
                        handleChange={evt => handleShipping(evt)}
                        type="text"
                    />

                        <FormInput 
                        placeholder="Line 2"
                        name="line2"
                        value={shippingAddress.line2}
                        handleChange={evt => handleShipping(evt)}
                        type="text"
                    />

                        <FormInput 
                        required
                        placeholder="City"
                        name = "city"
                        value={shippingAddress.city}
                        handleChange={evt => handleShipping(evt)}
                        type="text"
                    />

                        <FormInput 
                        required
                        placeholder="State"
                        name="state"
                        value={shippingAddress.state}
                        handleChange={evt => handleShipping(evt)}
                        type="text"
                    />

                        <FormInput 
                        required
                        placeholder="Postal Code"
                        name="postal_code"
                        value={shippingAddress.postal_code}
                        handleChange={evt => handleShipping(evt)}
                        type="text"
                    />  
                    <div className="formRow checkoutInput"  >
                    <CountryDropdown
                        required
                        onChange={(val) => handleShipping({
                            target: { 
                            name: 'country',
                            value: val
                        }
                        })}
                        value={shippingAddress.country}
                        valueType="short"
                        />
                    </div>
                </div>
                <div className="group">
                    <h2>
                        Billing Address
                    </h2>
                    <FormInput 
                    required
                    placeholder="Name On Card"
                    name="nameOnCard"
                    handleChange={evt => setNameOnCard(evt.target.value)}
                    value={nameOnCard}
                    type="text"
                    />
                    <FormInput 
                    required
                    placeholder="Line 1"
                    name="line1"
                    value={billingAddress.line1}
                    handleChange={evt => handleBilling(evt)}
                    type="text"
                    />
                    <FormInput 
                    placeholder="Line 2"
                    name="line2"
                    value={billingAddress.line2}
                    handleChange={evt => handleBilling(evt)}
                    type="text"
                    />
                    <FormInput 
                    required
                    placeholder="City"
                    name="city"
                    value={billingAddress.city}
                    handleChange={evt => handleBilling(evt)}
                    type="text"
                    />
                    <FormInput 
                    required
                    placeholder="State"
                    name="state"
                    value={billingAddress.state}
                    handleChange={evt => handleBilling(evt)}
                    type="text"
                    />
                    <FormInput
                    required 
                    placeholder="Postal Code"
                    name="postal_code"
                    value={billingAddress.postal_code}
                    handleChange={evt => handleBilling(evt)}
                    type="text"
                    />
                    <div className="formRow checkoutInput"  >
                        <CountryDropdown 
                        required
                        onChange={val => handleBilling({
                            target: { 
                            name: 'country',
                            value: val
                        }
                        })}
                        value={billingAddress.country}
                        valueType="short"
                        />
                    </div>
                </div>
                <div className="group">
                    <h2>
                        Card Details
                    </h2>
                    <CardElement
                    className="cardElement"
                        required
                        options={configCardElemet}
                    />
                </div>
                <div className="submitButton">
                    <Button type="submit">
                        Pay Now
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PaymentDetails;