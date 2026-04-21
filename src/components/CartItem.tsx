import React from "react";
import Button from "./Button";
import "../styles/CartItem.css";
import type { CartItemProps } from "../types";

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value);
    onQuantityChange(item.productId, item.variant, quantity);
  };

  return (
    <div className="cart-item">
      <h3>{item.product.name}</h3>
      <p>Price: ${item.product.price.toFixed(2)}</p>
      <input
        type="number"
        value={item.quantity}
        min="1"
        onChange={handleQuantityChange}
      />
      <Button
        variant="outline"
        onClick={() => onRemove(item.productId, item.variant)}
      >
        Remove
      </Button>
    </div>
  );
};

export default CartItem;
