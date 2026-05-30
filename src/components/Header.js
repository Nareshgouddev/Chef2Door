import React, { useState, useContext } from "react";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginLogout = () => {
    if (loggedInUser) {
      setLoggedInUser(""); // Log out
    } else {
      navigate("/Login"); // Navigate to login page
    }
  };

  return (
    <div className="header">
      <div className="header-main">
        {/* Logo Section */}
        <div>
          <Link to="/" className="logo-link">
            <img src={logo} alt="App logo" className="logo-img" />
            <span className="brand-name">
              <span className="brand-dark">Chef</span>
              <span className="brand-accent">2Door</span>
            </span>
          </Link>
        </div>

        {/* Hamburger Button — visible on mobile */}
        <button
          className={`hamburger${mobileMenuOpen ? " open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        {/* Navigation Links — desktop */}
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-cart-link">
              <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
          </li>

          {/* Login/Logout Button */}
          <li>
            <button className="btn-login" onClick={handleLoginLogout}>
              {loggedInUser ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
        <ul className="mobile-nav-list">
          <li className="mobile-nav-item">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="mobile-cart-link">
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
          </li>
          <li>
            <button
              className="btn-login-mobile"
              onClick={() => { handleLoginLogout(); setMobileMenuOpen(false); }}
            >
              {loggedInUser ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>

      {/* Online Status and User Info Section */}
      <div className="status-bar">
        <div className="status-bar-left">
          <span className={`status-dot ${onlineStatus ? "online" : "offline"}`} />
          {onlineStatus ? "Online" : "Offline"}
        </div>
        {loggedInUser && (
          <div>
            <Link className="ordering-for-link">
              Ordering for: <span className="ordering-for-user">{loggedInUser}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
