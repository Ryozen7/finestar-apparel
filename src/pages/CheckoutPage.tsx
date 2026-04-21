
import React from 'react';
import Checkout from '../components/Checkout';
import '../styles/Cart.css';

const CheckoutPage: React.FC = () => {
    return (
        <div className="cart-page-container">
            <h1>Checkout</h1>
            <Checkout />
        </div>
    );
};

export default CheckoutPage;