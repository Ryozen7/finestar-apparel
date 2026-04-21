import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSelect, IonSelectOption, IonImg, IonLabel, IonText } from '@ionic/react';
import "../styles/ProductModal.css";
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
    (value: string) => {
      const [size, color] = value.split("|");
      setSelectedVariant(
        product.variants.find((v) => v.size === size && v.color === color) || null,
      );
    },
    [product.variants],
  );



  const handleAddToCart = useCallback(() => {
    if (selectedVariant) {
      onAdd(selectedVariant);
      toast.success("Added to cart!");
    }
  }, [onAdd, selectedVariant]);

  const fallbackImg = "/no-image.png";
  return (
    <IonModal isOpen={open} onDidDismiss={onClose} backdropDismiss={true} className="modal-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">{product.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="modal-inner">
        <IonImg
          src={product.image || fallbackImg}
          alt={product.name}
          className="modal-product-img"
          onIonError={e => {
            const target = e.target as unknown as HTMLImageElement;
            if (target.src !== window.location.origin + fallbackImg) {
              target.src = fallbackImg;
            }
          }}
        />
        <IonText><p>Category: {product.category}</p></IonText>

          <p>
            Price: $
            {selectedVariant
              ? selectedVariant.price.toFixed(2)
              : product.variants[0]?.price.toFixed(2)}
          </p>
        <div className="variant-select-wrapper">
          <IonLabel>Choose variant:</IonLabel>
          <select
            value={selectedVariant ? `${selectedVariant.size}|${selectedVariant.color}` : ""}
            onChange={e => handleVariantChange(e.target.value)}
          >
            {variantOptions}
          </select>
        </div>
        <div className="modal-actions">
          <IonButton
            color="ghost"
            onClick={handleAddToCart}
            disabled={!selectedVariant || loading}
            expand="block"
            className="btn-add-to-cart"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </IonButton>
          <IonButton color="medium" fill="outline" className="btn-cancel" onClick={onClose} expand="block">
            Cancel
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ProductModal;
