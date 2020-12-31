import React from 'react';
import PaymentDetails from './../../components/PaymentDetails';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publishableKey } from './../../stripe/config';

const StripePromise = loadStripe(publishableKey);

const Payment = () => {
    return (
        <Elements stripe={StripePromise}>
            <PaymentDetails />
        </Elements>
    );
}

export default Payment;