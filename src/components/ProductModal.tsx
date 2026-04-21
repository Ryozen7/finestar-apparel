import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../styles/ProductModal.css";
import Button from "./Button";
import { toast } from "sonner";
import type { ProductVariant, ProductModalProps } from "../types";

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  open,
  onClose,
  onAdd,
  loading,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  useEffect(() => {
    if (open) setSelectedVariant(product.variants[0] || null);
  }, [open, product.variants]);

  const variantOptions = useMemo(
    () =>
      product.variants.map((variant, idx) => (
        <option key={idx} value={`${variant.size}|${variant.color}`}>
          Size: {variant.size}, Color: {variant.color} — ${variant.price.toFixed(2)}
        </option>
      )),
    [product.variants],
  );

  const handleVariantChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const [size, color] = e.target.value.split("|");
      setSelectedVariant(
        product.variants.find((v) => v.size === size && v.color === color) || null,
      );
    },
    [product.variants],
  );

  if (!open) return null;

  const handleAddToCart = useCallback(() => {
    if (selectedVariant) {
      onAdd(selectedVariant);
      toast.success("Added to cart!");
    }
  }, [onAdd, selectedVariant]);

  const fallbackImg = "/no-image.png";
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <img
          src={product.image || fallbackImg}
          alt={product.name}
          className="modal-product-img"
          onError={e => {
            const target = e.target as HTMLImageElement;
            if (target.src !== window.location.origin + fallbackImg) {
              target.src = fallbackImg;
            }
          }}
        />
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
            onChange={handleVariantChange}
          >
            {variantOptions}
          </select>
        </div>
        <div className="modal-actions">
          <Button
            variant="primary"
            onClick={handleAddToCart}
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
