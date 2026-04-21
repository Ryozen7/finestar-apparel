import React from 'react';
import Button from './Button';
import './Button.css';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <Button variant="primary" onClick={() => onAddToCart(product)}>Add to Cart</Button>
    </div>
  );
};

export default ProductItem;