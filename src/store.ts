import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './redux/slices/productsSlice';
import cartReducer from './redux/slices/cartSlice';
import themeReducer from './redux/slices/themeSlice';
import menuReducer from './redux/slices/menuSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
