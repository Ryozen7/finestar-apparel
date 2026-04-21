import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Product, ProductsState } from "../../types";
import { removeProductDuplicates } from "../../utils/removeProductDuplicates";

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch products from a mock API
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          // Remove duplicates by name, price, category
          state.items = removeProductDuplicates(action.payload);
          state.status = "succeeded";
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
