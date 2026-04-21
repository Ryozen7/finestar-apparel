import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { clearCartThunk } from "../redux/slices/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import "../styles/Checkout.css";
import { downloadReceiptPDF } from "../utils/downloadReceiptPDF";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], subtotal = 0 } = location.state || {};
  const [promo, setPromo] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const discount = promo.trim().toUpperCase() === "SAVE10" ? 0.1 * subtotal : 0;
  const finalTotal = subtotal - discount;

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate order processing delay
    setTimeout(async () => {
      setOrderPlaced(true);
      setTimestamp(new Date().toLocaleString());
      await dispatch(clearCartThunk());
      setLoading(false);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-receipt">
        <h2>Order Receipt</h2>
        <div>Date: {timestamp}</div>
        <div>Total: ${subtotal.toFixed(2)}</div>
        <div>Discount: -${discount.toFixed(2)}</div>
        <div>
          <b>Final Total: ${finalTotal.toFixed(2)}</b>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            downloadReceiptPDF({
              date: timestamp,
              subtotal,
              discount,
              finalTotal,
              items: cartItems.map((item: any) => ({
                name: item.product.name,
                size: item.variant.size,
                color: item.variant.color,
                price: item.product.price,
                quantity: item.quantity,
              })),
            })
          }
        >
          Download PDF
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
        >
          Back to Store
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item: any, idx: number) => (
            <li key={item.product.id + "-" + idx}>
              {item.product.name} (Size: {item.variant.size}, Color:{" "}
              {item.variant.color}) - ${item.product.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <div className="checkout-promo">
          <Input
            type="text"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="checkout-promo-input"
          />
          <span className={discount > 0 ? "checkout-promo-success" : undefined}>
            {discount > 0
              ? "Promo applied: SAVE10 (-10%)"
              : "Enter SAVE10 for 10% off"}
          </span>
        </div>
        <div className="checkout-discount">
          Discount: -${discount.toFixed(2)}
        </div>
        <p className="checkout-final">Final Total: ${finalTotal.toFixed(2)}</p>
      </div>
      <Button variant="primary" onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
};

export default Checkout;
