import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CartItem, ProductVariant } from "../../types";
import { fetchCart, saveCart, clearCartApi } from "../api/cartApi";

import type { CartState } from "../../types";

const initialState: CartState = {
  items: [],
};

export const fetchCartThunk = createAsyncThunk("cart/fetchCart", async () => {
  const data = await fetchCart();
  // If using a single cart with id '1', data.items is the array
  return data.items || [];
});

export const saveCartThunk = createAsyncThunk(
  "cart/saveCart",
  async (items: CartItem[]) => {
    await saveCart(items);
    return items;
  },
);

export const clearCartThunk = createAsyncThunk("cart/clearCart", async () => {
  await clearCartApi();
  return [];
});

function findCartItemIndex(
  items: CartItem[],
  productId: string,
  variant: ProductVariant,
) {
  return items.findIndex(
    (item) =>
      item.productId === productId &&
      item.variant.size === variant.size &&
      item.variant.color === variant.color,
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

// export { saveCartThunk, fetchCartThunk, clearCartThunk }; // Removed duplicate export to fix redeclaration error
export default cartSlice.reducer;
