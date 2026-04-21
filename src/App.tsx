import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  React.useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;