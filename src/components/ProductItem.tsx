import React, { useState } from "react";
import Button from "./Button";
import ProductModal from "./ProductModal";
import "../styles/ProductItem.css";
import type { ProductItemProps, ProductVariant } from "../types";




const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (variant: ProductVariant) => {
    setLoading(true);
    await onAddToCart(product, variant);
    setModalOpen(false);
    setLoading(false);
  };

  return (
    <div className="product-item">
      {product.image && (
        <img src={product.image} alt={product.name} />
      )}
      <h2 className="product-item-title">{product.name}</h2>
      <div className="product-item-category">{product.category}</div>
      <div className="product-item-price">
        $
        {product.variants.length > 0
          ? Math.min(...product.variants.map((v) => v.price)).toFixed(2)
          : product.price.toFixed(2)}
      </div>
      <Button
        variant="primary"
        onClick={() => setModalOpen(true)}
      >
        Add to Cart
      </Button>
      <ProductModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
        loading={loading}
      />
    </div>
  );
};

export default ProductItem;
