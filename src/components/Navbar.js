import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { pathname, hash } = useLocation();
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  // NavLink matching ignores the hash, so the home/Featured links get an
  // explicit check to keep them mutually exclusive on the home page.
  const onHome = pathname === "/";
  const featuredActive = onHome && hash === "#featured";
  const homeActive = onHome && !featuredActive;

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <h1>
            iCe<span className="primary">Coin</span>
          </h1>
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <NavLink
              to="/"
              end
              className={() => (homeActive ? "active" : "")}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#featured"
              className={() => (featuredActive ? "active" : "")}
              onClick={closeMenu}
            >
              Featured
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/crypto-calculator"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Calculate
            </NavLink>
          </li>
        </ul>
        <div className="btn-group">
          <button className="btn">Connect Wallet</button>
        </div>
        <div
          className="hamburger"
          onClick={handleClick}
          aria-label="Toggle navigation menu"
        >
          {click ? (
            <FaTimes size={20} style={{ color: "#333" }} />
          ) : (
            <FaBars size={20} style={{ color: "#333" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
