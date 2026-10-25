import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { pathname, hash } = useLocation();
  const headerRef = useRef(null);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  // NavLink matching ignores the hash, so the home/Featured links get an
  // explicit check to keep them mutually exclusive on the home page.
  const onHome = pathname === "/";
  const featuredActive = onHome && hash === "#featured";
  const homeActive = onHome && !featuredActive;

  // Escape closes the open menu.
  useEffect(() => {
    if (!click) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setClick(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [click]);

  // A click anywhere outside the header closes the menu.
  useEffect(() => {
    if (!click) return;

    const onMouseDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setClick(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [click]);

  // The open menu is a 100vh overlay, so stop the page scrolling behind it.
  useEffect(() => {
    if (!click) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [click]);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <Link to="/" className="logo" aria-label="ViCoin home">
          <span className="logo-mark">
            Vi<span className="primary">Coin</span>
          </span>
        </Link>
        <ul id="nav-menu" className={click ? "nav-menu active" : "nav-menu"}>
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
        <button
          type="button"
          className="hamburger"
          onClick={handleClick}
          aria-label="Toggle navigation menu"
          aria-expanded={click}
          aria-controls="nav-menu"
        >
          {click ? (
            <FaTimes size={20} />
          ) : (
            <FaBars size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
