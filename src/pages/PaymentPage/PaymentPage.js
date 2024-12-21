import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutPayment';
import { loadStripe } from '@stripe/stripe-js';




// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QTJs1HVJAQ9iRbgH54ielxjmvUNZHoL96fjrL5MATmdYlMjUVpA2PiMrlQi7MJc7RXcxxRzS4bGFR4SjpocplbI00iHwnhxVv');

const PaymentPage = (props) => {

  const options = {
    mode: 'payment',
    amount: 5000000, // Amount is in the smallest currency unit, e.g., 1000 paise = ₹10
    currency: 'inr',
    appearance: {
      theme: 'flat', // You can customize with themes like 'stripe', 'flat', 'night', etc.
    },
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm  {...props}/>
      </Elements>
    </div>
  )
}

export default PaymentPage;   