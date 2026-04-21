import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import CartItem from './CartItem';

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (productId: string, variant: { size: string; color: string }) => {
        dispatch(removeFromCart({ productId, variant }));
    };

    const handleQuantityChange = (productId: string, variant: { size: string; color: string }, quantity: number) => {
        dispatch(updateQuantity({ productId, variant, quantity }));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.productId + '-' + item.variant.size + '-' + item.variant.color}
                            item={item}
                            onRemove={() => handleRemove(item.productId, item.variant)}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                    <div className="subtotal">
                        <h3>Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;