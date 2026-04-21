import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaSun, FaMoon } from "react-icons/fa";
import "../styles/NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { toggleTheme } from "../redux/slices/themeSlice";
import Button from "./Button";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();
  const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const handleToggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" aria-label="Home">
          <img
            src="/logo.png"
            alt="FineStar Apparel Logo"
            className="navbar-logo-img"
          />
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="navbar-cart" title="Cart">
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>
        <Button
          className="navbar-hamburger"
          variant="outline"
          onClick={handleToggleMenu}
          aria-label="Menu"
        >
          <FaBars size={22} />
        </Button>
        {menuOpen && (
          <div className="navbar-menu">
            <Button
              className="navbar-theme"
              variant="outline"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
              {darkMode ? " Light Mode" : " Dark Mode"}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
