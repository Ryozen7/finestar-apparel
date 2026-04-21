import React from "react";
import "../styles/ProductModal.css";
import Button from "./Button";
import type { Product, ProductVariant } from "../types";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdd: (variant: ProductVariant) => void;
  loading: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  open,
  onClose,
  onAdd,
  loading,
}) => {
  const [selectedVariant, setSelectedVariant] =
    React.useState<ProductVariant | null>(null);

  React.useEffect(() => {
    if (open) setSelectedVariant(product.variants[0] || null);
  }, [open, product.variants]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>
          Price: $
          {selectedVariant
            ? selectedVariant.price.toFixed(2)
            : product.variants[0]?.price.toFixed(2)}
        </p>
        <div className="variant-select-wrapper">
          <label htmlFor="variant-select">Choose variant:</label>
          <select
            id="variant-select"
            className="variant-select"
            value={
              selectedVariant
                ? `${selectedVariant.size}|${selectedVariant.color}`
                : ""
            }
            onChange={(e) => {
              const [size, color] = e.target.value.split("|");
              setSelectedVariant(
                product.variants.find(
                  (v) => v.size === size && v.color === color,
                ) || null,
              );
            }}
          >
            {product.variants.map((variant, idx) => (
              <option key={idx} value={`${variant.size}|${variant.color}`}>
                Size: {variant.size}, Color: {variant.color} — $
                {variant.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <Button
            variant="primary"
            onClick={() => selectedVariant && onAdd(selectedVariant)}
            disabled={!selectedVariant}
            loading={loading}
          >
            Add to Cart
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
