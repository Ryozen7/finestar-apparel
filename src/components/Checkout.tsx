import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

import { clearCart } from '../redux/slices/cartSlice';

import Button from './Button';
import './Button.css';
import { applyDiscount } from '../utils/discounts';

const Checkout: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    // If discountCode is not in state, use local state
    const [discountCode, setDiscountCode] = useState('');
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const total = applyDiscount(subtotal, discountCode);

    const handleCompletePurchase = () => {
        alert('Purchase complete!');
        dispatch(clearCart());
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="checkout-summary">
                <h3>Order Summary</h3>
                <ul>
                    {cartItems.map((item, idx) => (
                        <li key={item.product.id + '-' + idx}>
                            {item.product.name} - ${item.product.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <div>
                    <label htmlFor="discount">Promo Code: </label>
                    <input
                        id="discount"
                        type="text"
                        value={discountCode}
                        onChange={e => setDiscountCode(e.target.value)}
                        placeholder="Enter code (e.g. SAVE10)"
                    />
                </div>
                <p>Total after discount: ${total.toFixed(2)}</p>
            </div>
            <Button variant="primary" onClick={handleCompletePurchase}>Complete Purchase</Button>
        </div>
    );
};

export default Checkout;