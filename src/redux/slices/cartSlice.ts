import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, ProductVariant } from '../../types';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

function findCartItemIndex(items: CartItem[], productId: string, variant: ProductVariant) {
  return items.findIndex(
    (item) =>
      item.productId === productId &&
      item.variant.size === variant.size &&
      item.variant.color === variant.color
  );
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ productId: string; variant: ProductVariant; quantity: number; product: any }>
    ) => {
      const { productId, variant, quantity, product } = action.payload;
      const idx = findCartItemIndex(state.items, productId, variant);
      if (idx !== -1) {
        state.items[idx].quantity += quantity;
      } else {
        state.items.push({ productId, variant, quantity, product });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; variant: ProductVariant }>) => {
      state.items = state.items.filter(
        (item) =>
          !(item.productId === action.payload.productId &&
            item.variant.size === action.payload.variant.size &&
            item.variant.color === action.payload.variant.color)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; variant: ProductVariant; quantity: number }>
    ) => {
      const { productId, variant, quantity } = action.payload;
      const idx = findCartItemIndex(state.items, productId, variant);
      if (idx !== -1) {
        state.items[idx].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
