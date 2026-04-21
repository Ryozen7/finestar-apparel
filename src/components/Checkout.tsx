import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { clearCartThunk } from "../redux/slices/cartSlice";
import { useLocation, useHistory } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import "../styles/Checkout.css";
import { downloadReceiptPDF } from "../utils/downloadReceiptPDF";
import { toast } from "sonner";
import type { CartItem } from "../types";

const Checkout: React.FC = () => {
  const location : { state: { cartItems: CartItem[]; subtotal: number } }    = useLocation();
  const history = useHistory();
  const { cartItems = [], subtotal = 0 } = location.state || { cartItems: [], subtotal: 0 };
  const [promo, setPromo] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  // Format date as 'Month Day, Year Time AM/PM'
  const formattedDate = useMemo(() => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, [timestamp]);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const discount = useMemo(() => (promo.trim().toUpperCase() === "SAVE10" ? 0.1 * subtotal : 0), [promo, subtotal]);
  const finalTotal = useMemo(() => subtotal - discount, [subtotal, discount]);

  const handlePlaceOrder = useCallback(async () => {
    setLoading(true);
    // Simulate order processing delay
    setTimeout(async () => {
      setOrderPlaced(true);
      setTimestamp(new Date().toLocaleString());
      await dispatch(clearCartThunk());
      setLoading(false);
      toast.success("Order placed successfully!");
    }, 1000);
  }, [dispatch]);

  if (orderPlaced) {
    return (
      <div className="checkout-receipt">
        <h2>Order Receipt</h2>
        <div>Date: {formattedDate}</div>
        <div>Total: ${subtotal.toFixed(2)}</div>
        <div>Discount: -${discount.toFixed(2)}</div>
        <div>
          <b>Final Total: ${finalTotal.toFixed(2)}</b>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            downloadReceiptPDF({
              date: formattedDate,
              subtotal,
              discount,
              finalTotal,
              items: cartItems.map((item: CartItem) => ({
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
        <Button variant="primary" onClick={() => history.push("/")}>
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
          {cartItems.map((item: CartItem, idx: number) => (
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
