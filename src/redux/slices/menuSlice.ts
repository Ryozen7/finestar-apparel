import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: string;
  name: string;
  path: string;
}

export interface MenuState {
  items: MenuItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  status: 'idle',
  error: null,
};

// Replace this URL with your actual MockAPI endpoint
export const fetchMenu = createAsyncThunk<MenuItem[]>(
  'menu/fetchMenu',
  async () => {
    const response = await fetch('https://64b7f1a021b9aa6eb079b2e2.mockapi.io/api/menu');
    if (!response.ok) throw new Error('Failed to fetch menu');
    return response.json();
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch menu';
      });
  },
});

export default menuSlice.reducer;
