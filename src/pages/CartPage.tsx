
import React from 'react';
import Cart from '../components/Cart';
import '../styles/Cart.css';

const CartPage: React.FC = () => {
    return (
        <div className="cart-page-container">
            <h1>Your Shopping Cart</h1>
            <Cart />
        </div>
    );
};

export default CartPage;