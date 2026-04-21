import { type FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NavBar from "./components/NavBar";
import { fetchCartThunk } from "./redux/slices/cartSlice";
import { Toaster } from "sonner";

const App: FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  return (
    <main className={`container ${darkMode ? "dark-mode" : ""}`}>
        <Toaster position="top-center" richColors />
        <NavBar />
        <IonRouterOutlet id="main"  className="main-content">
            <Route path="/" component={Home} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
        </IonRouterOutlet>
     </main>
  );
};

export default App;
