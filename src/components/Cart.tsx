import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { saveCartThunk } from "../redux/slices/cartSlice";
import "../styles/Cart.css";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleRemove = async (
    productId: string,
    variant: import("../types").ProductVariant,
  ) => {
    setLoadingItem(productId + "-" + variant.size + "-" + variant.color);
    const newCart = cartItems.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.variant.size === variant.size &&
          item.variant.color === variant.color
        ),
    );
    await dispatch(saveCartThunk(newCart));
    setLoadingItem(null);
  };

  const handleQuantityChange = async (
    productId: string,
    variant: import("../types").ProductVariant,
    quantity: number,
  ) => {
    setLoadingItem(productId + "-" + variant.size + "-" + variant.color);
    const newCart = cartItems.map((item) =>
      item.productId === productId &&
      item.variant.size === variant.size &&
      item.variant.color === variant.color
        ? { ...item, quantity }
        : item,
    );
    await dispatch(saveCartThunk(newCart));
    setLoadingItem(null);
  };

  const [showReceipt, setShowReceipt] = React.useState(false);
  const [receipt, setReceipt] = React.useState<{
    total: number;
    discount: number;
    final: number;
    timestamp: string;
  } | null>(null);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    setTimeout(() => {
      setLoadingCheckout(false);
      navigate("/checkout", {
        state: {
          cartItems,
          subtotal: calculateSubtotal(),
        },
      });
    }, 600); // Simulate loading
  };

  // Group cart items by productId
  const grouped = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.productId]) acc[item.productId] = [];
      acc[item.productId].push(item);
      return acc;
    },
    {} as Record<string, typeof cartItems>,
  );

  return (
    <div className="cart">
      {showReceipt && receipt ? (
        <div className="receipt">
          <h2>Receipt</h2>
          <div>Date: {receipt.timestamp}</div>
          <div>Total: ${receipt.total.toFixed(2)}</div>
          <div>Discount: -${receipt.discount.toFixed(2)}</div>
          <div>
            <b>Final Total: ${receipt.final.toFixed(2)}</b>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowReceipt(false)}
          >
            Back to Store
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {Object.entries(grouped).map(([productId, items]) => (
            <div key={productId} className="cart-product-card">
              <h3>{items[0].product.name}</h3>
              <div className="cart-product-variants">
                {items.map((item) => (
                  <div
                    key={
                      item.productId +
                      "-" +
                      item.variant.size +
                      "-" +
                      item.variant.color
                    }
                    className="cart-product-variant"
                  >
                    <div>
                      <b>Variant:</b> Size: {item.variant.size}, Color:{" "}
                      {item.variant.color}
                    </div>
                    <div>
                      <b>Price:</b> ${item.product.price.toFixed(2)}
                    </div>
                    <div className="cart-variant-qty-row">
                      <label
                        htmlFor={`qty-${item.productId}-${item.variant.size}-${item.variant.color}`}
                      >
                        Qty:
                      </label>
                      <input
                        id={`qty-${item.productId}-${item.variant.size}-${item.variant.color}`}
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            item.variant,
                            parseInt(e.target.value),
                          )
                        }
                        disabled={
                          loadingItem ===
                          item.productId +
                            "-" +
                            item.variant.size +
                            "-" +
                            item.variant.color
                        }
                      />
                    </div>
                    <button
                      className="btn btn-outline"
                      onClick={() => handleRemove(item.productId, item.variant)}
                      disabled={
                        loadingItem ===
                        item.productId +
                          "-" +
                          item.variant.size +
                          "-" +
                          item.variant.color
                      }
                    >
                      {loadingItem ===
                      item.productId +
                        "-" +
                        item.variant.size +
                        "-" +
                        item.variant.color
                        ? "..."
                        : "Remove"}
                    </button>
                    <div className="item-total">
                      Item Total: $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-product-subtotal">
                <b>
                  Product Subtotal: $
                  {items
                    .reduce((sum, i) => sum + i.product.price * i.quantity, 0)
                    .toFixed(2)}
                </b>
              </div>
            </div>
          ))}
          <div className="subtotal">
            <h3>Cart Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
          </div>
          <div className="cart-fixed-checkout">
            <button
              className="btn btn-primary cart-checkout-btn"
              onClick={handleCheckout}
              disabled={loadingCheckout}
            >
              {loadingCheckout ? "Loading..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
