import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { toggleTheme } from '../redux/slices/themeSlice';
import Button from './Button';
import './Button.css';

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();
  const handleToggleTheme = () => dispatch(toggleTheme());
  const isSignedIn = false; // Replace with real auth logic

  const handleToggleMenu = () => setMenuOpen((open) => !open);


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Fine Cloth Store</Link>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="navbar-cart" title="Cart">
          <FaShoppingCart size={22} />
        </Link>
        <Button className="navbar-hamburger" variant="outline" onClick={handleToggleMenu} aria-label="Menu">
          <FaBars size={22} />
        </Button>
        {menuOpen && (
          <div className="navbar-menu">
            <Button className="navbar-theme" variant="outline" onClick={handleToggleTheme} aria-label="Toggle theme">
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
              {darkMode ? ' Light Mode' : ' Dark Mode'}
            </Button>
            <Link to="/profile" className="navbar-menu-item">
              <FaUserCircle size={18} /> Profile
            </Link>
            {isSignedIn ? (
              <Button className="navbar-menu-item" variant="secondary">Sign Out</Button>
            ) : (
              <Button className="navbar-menu-item" variant="primary">Sign In</Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
