import React, { useState } from "react";
import Button from "./Button";
import ProductModal from "./ProductModal";
import "../styles/Button.css";
import type { Product, ProductVariant } from "../types";

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  padding: 24,
  margin: "1.5rem 0",
  maxWidth: 320,
  minWidth: 240,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "box-shadow 0.2s",
};

const priceStyle: React.CSSProperties = {
  color: "#2ecc40",
  fontWeight: 700,
  fontSize: "1.2rem",
  margin: "8px 0",
};

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

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
    <div className="product-item" style={cardStyle}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 12,
          }}
        />
      )}
      <h2
        style={{ margin: "8px 0 4px 0", fontSize: "1.1rem", fontWeight: 600 }}
      >
        {product.name}
      </h2>
      <div style={{ color: "#888", fontSize: 14, marginBottom: 4 }}>
        {product.category}
      </div>
      <div style={priceStyle}>
        $
        {product.variants.length > 0
          ? Math.min(...product.variants.map((v) => v.price)).toFixed(2)
          : product.price.toFixed(2)}
      </div>
      <Button
        variant="primary"
        onClick={() => setModalOpen(true)}
        style={{ minWidth: 120 }}
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
