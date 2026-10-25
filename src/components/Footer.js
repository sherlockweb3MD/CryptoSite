import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const REPO_URL = "https://github.com/sherlockweb3MD/CryptoSite";
const SITE_URL = "https://martinscrypto.vercel.app/";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="col brand">
            <Link to="/" className="logo" aria-label="ViCoin home">
              <span className="logo-mark">
                Vi<span className="primary">Coin</span>
              </span>
            </Link>
            <p className="tagline">
              Live crypto prices and a straight answer on what your position
              is worth.
            </p>
          </div>
          <div className="col">
            <h5>Explore</h5>
            <span className="bar"></span>
            <Link to="/">Home</Link>
            <Link to="/#featured">Featured</Link>
            <Link to="/crypto-calculator">Calculator</Link>
          </div>
          <div className="col">
            <h5>Project</h5>
            <span className="bar"></span>
            <a href={REPO_URL} target="_blank" rel="noreferrer">
              Source Code
            </a>
            <a href={SITE_URL} target="_blank" rel="noreferrer">
              Live Site
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ViCoin</span>
          <span>Market data by CoinGecko · Not financial advice</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
