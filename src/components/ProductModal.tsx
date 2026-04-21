import React from 'react';
import Button from './Button';
import type { Product, ProductVariant } from '../types';
import './Button.css';

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdd: (variant: ProductVariant) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose, onAdd }) => {
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);

  React.useEffect(() => {
    if (open) setSelectedVariant(product.variants[0] || null);
  }, [open, product.variants]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 320, maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>
          Price: $
          {selectedVariant
            ? selectedVariant.price.toFixed(2)
            : product.variants[0]?.price.toFixed(2)}
        </p>
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="variant-select">Choose variant:</label>
          <select
            id="variant-select"
            value={selectedVariant ? `${selectedVariant.size}|${selectedVariant.color}` : ''}
            onChange={e => {
              const [size, color] = e.target.value.split('|');
              setSelectedVariant(product.variants.find(v => v.size === size && v.color === color) || null);
            }}
            style={{ marginLeft: 8, padding: 6 }}
          >
            {product.variants.map((variant, idx) => (
              <option key={idx} value={`${variant.size}|${variant.color}`}>
                Size: {variant.size}, Color: {variant.color} — ${variant.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Button variant="primary" onClick={() => selectedVariant && onAdd(selectedVariant)} disabled={!selectedVariant}>Add to Cart</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
