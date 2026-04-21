import React, { useState } from 'react';
import Button from './Button';
import ProductModal from './ProductModal';
import './Button.css';
import type { Product, ProductVariant } from '../types';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}


const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (variant: ProductVariant) => {
    onAddToCart(product, variant);
    setModalOpen(false);
  };

  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${
        product.variants.length > 0
          ? Math.min(...product.variants.map(v => v.price)).toFixed(2)
          : product.price.toFixed(2)
      }</p>
      <Button variant="primary" onClick={() => setModalOpen(true)}>Add to Cart</Button>
      <ProductModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default ProductItem;