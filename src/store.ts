import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './redux/slices/productsSlice';
import cartReducer from './redux/slices/cartSlice';
import themeReducer from './redux/slices/themeSlice';
import menuReducer from './redux/slices/menuSlice';


// Load cart from localStorage
function loadCartState() {
  try {
    const serialized = localStorage.getItem('cart');
    if (!serialized) return undefined;
    return { cart: { items: JSON.parse(serialized) } };
  } catch {
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    menu: menuReducer,
  },
  preloadedState: loadCartState(),
});

// Save cart to localStorage on change
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  } catch {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
