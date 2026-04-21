import React, { useState, useCallback } from "react";
import Button from "./Button";
import ProductModal from "./ProductModal";
import "../styles/ProductItem.css";
import type { ProductItemProps, ProductVariant } from "../types";

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = useCallback(async (variant: ProductVariant) => {
    setLoading(true);
    await onAddToCart(product, variant);
    setModalOpen(false);
    setLoading(false);
  }, [onAddToCart, product]);

  const handleOpenModal = useCallback(() => setModalOpen(true), []);
  const handleCloseModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className="product-item">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
      ) : null}
      {!product.image && (
        <div className="product-item-no-image">No image found</div>
      )}
      <div className="product-item-no-image" style={{ display: 'none', alignItems: 'center', justifyContent: 'center' }}>No image found</div>
      <h2 className="product-item-title">{product.name}</h2>
      <div className="product-item-category">{product.category}</div>
      <div className="product-item-price">
        $
        {product.variants.length > 0
          ? Math.min(...product.variants.map((v) => v.price)).toFixed(2)
          : product.price.toFixed(2)}
      </div>
      <Button variant="primary" onClick={handleOpenModal}>
        Add to Cart
      </Button>
      <ProductModal
        product={product}
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAdd}
        loading={loading}
      />
    </div>
  );
};

export default ProductItem;
