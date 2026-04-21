import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { clearCartThunk } from '../redux/slices/cartSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import './Button.css';

const Checkout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems = [], subtotal = 0 } = location.state || {};
    const [promo, setPromo] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [timestamp, setTimestamp] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const discount = promo.trim().toUpperCase() === 'SAVE10' ? 0.1 * subtotal : 0;
    const finalTotal = subtotal - discount;

    const handlePlaceOrder = async () => {
        setOrderPlaced(true);
        setTimestamp(new Date().toLocaleString());
        await dispatch(clearCartThunk());
    };

    if (orderPlaced) {
        return (
            <div className="checkout-receipt" style={{ background: 'var(--surface)', borderRadius: 8, padding: 24, margin: '2rem auto', maxWidth: 420, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
                <h2>Order Receipt</h2>
                <div>Date: {timestamp}</div>
                <div>Total: ${subtotal.toFixed(2)}</div>
                <div>Discount: -${discount.toFixed(2)}</div>
                <div><b>Final Total: ${finalTotal.toFixed(2)}</b></div>
                <Button variant="primary" style={{ marginTop: 24 }} onClick={() => navigate('/')}>Back to Store</Button>
            </div>
        );
    }

    return (
        <div className="checkout">
            <div className="checkout-summary">
                <h3>Order Summary</h3>
                <ul>
                    {cartItems.map((item: any, idx: number) => (
                        <li key={item.product.id + '-' + idx}>
                            {item.product.name} (Size: {item.variant.size}, Color: {item.variant.color}) - ${item.product.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <div style={{ margin: '12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Input
                        type="text"
                        placeholder="Promo code"
                        value={promo}
                        onChange={e => setPromo(e.target.value)}
                        style={{ minWidth: 120 }}
                    />
                    <span style={{ color: discount > 0 ? 'green' : 'inherit' }}>
                        {discount > 0 ? 'Promo applied: SAVE10 (-10%)' : 'Enter SAVE10 for 10% off'}
                    </span>
                </div>
                <div style={{ fontWeight: 500, margin: '8px 0' }}>Discount: -${discount.toFixed(2)}</div>
                <p style={{ fontWeight: 700 }}>Final Total: ${finalTotal.toFixed(2)}</p>
            </div>
            <Button variant="primary" onClick={handlePlaceOrder}>Place Order</Button>
        </div>
    );
};

export default Checkout;