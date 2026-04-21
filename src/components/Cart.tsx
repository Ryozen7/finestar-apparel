import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { saveCartThunk, clearCartThunk } from '../redux/slices/cartSlice';

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    const handleRemove = (productId: string, variant: import('../types').ProductVariant) => {
        const newCart = cartItems.filter(
            (item) => !(item.productId === productId && item.variant.size === variant.size && item.variant.color === variant.color)
        );
        dispatch(saveCartThunk(newCart));
    };

    const handleQuantityChange = (productId: string, variant: import('../types').ProductVariant, quantity: number) => {
        const newCart = cartItems.map((item) =>
            item.productId === productId && item.variant.size === variant.size && item.variant.color === variant.color
                ? { ...item, quantity }
                : item
        );
        dispatch(saveCartThunk(newCart));
    };

    const [showReceipt, setShowReceipt] = React.useState(false);
    const [receipt, setReceipt] = React.useState<{ total: number; discount: number; final: number; timestamp: string } | null>(null);
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        navigate('/checkout', {
            state: {
                cartItems,
                subtotal: calculateSubtotal(),
            }
        });
    };

    // Group cart items by productId
    const grouped = cartItems.reduce((acc, item) => {
        if (!acc[item.productId]) acc[item.productId] = [];
        acc[item.productId].push(item);
        return acc;
    }, {} as Record<string, typeof cartItems>);

    return (
        <div className="cart">
            {showReceipt && receipt ? (
                <div className="receipt" style={{ background: 'var(--surface)', borderRadius: 8, padding: 24, margin: '2rem auto', maxWidth: 420, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
                    <h2>Receipt</h2>
                    <div>Date: {receipt.timestamp}</div>
                    <div>Total: ${receipt.total.toFixed(2)}</div>
                    <div>Discount: -${receipt.discount.toFixed(2)}</div>
                    <div><b>Final Total: ${receipt.final.toFixed(2)}</b></div>
                    <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setShowReceipt(false)}>Back to Store</button>
                </div>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {Object.entries(grouped).map(([productId, items]) => (
                        <div key={productId} className="cart-product-card" style={{ background: 'var(--surface)', borderRadius: 8, margin: '1.5rem 0', padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ marginBottom: 8 }}>{items[0].product.name}</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                                {items.map(item => (
                                    <div key={item.productId + '-' + item.variant.size + '-' + item.variant.color} style={{ border: '1px solid var(--border-color)', borderRadius: 6, padding: 12, minWidth: 180, background: '#fafbfc' }}>
                                        <div><b>Variant:</b> Size: {item.variant.size}, Color: {item.variant.color}</div>
                                        <div><b>Price:</b> ${item.product.price.toFixed(2)}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
                                            <label htmlFor={`qty-${item.productId}-${item.variant.size}-${item.variant.color}`}>Qty:</label>
                                            <input
                                                id={`qty-${item.productId}-${item.variant.size}-${item.variant.color}`}
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={e => handleQuantityChange(item.productId, item.variant, parseInt(e.target.value))}
                                                style={{ width: 48, padding: 4 }}
                                            />
                                        </div>
                                        <button className="btn btn-outline" onClick={() => handleRemove(item.productId, item.variant)} style={{ marginTop: 4 }}>Remove</button>
                                        <div style={{ marginTop: 8, fontWeight: 500 }}>
                                            Item Total: ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 16, textAlign: 'right' }}>
                                <b>Product Subtotal: ${items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2)}</b>
                            </div>
                        </div>
                    ))}
                    <div className="subtotal" style={{ textAlign: 'right', marginTop: 24 }}>
                        <h3>Cart Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
                    </div>
                    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: 'var(--surface)', boxShadow: '0 -2px 12px rgba(0,0,0,0.08)', padding: 16, display: 'flex', justifyContent: 'center', zIndex: 100 }}>
                        <button className="btn btn-primary" style={{ minWidth: 220, fontSize: '1.1rem' }} onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;