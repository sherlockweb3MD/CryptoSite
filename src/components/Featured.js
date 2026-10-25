import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getMarkets } from "../api/coingecko";
import "./Featured.css";

const CoinCard = ({ coin }) => {
  const change = coin.price_change_percentage_24h;
  const hasChange = typeof change === "number";
  const isDown = hasChange && change < 0;
  const price =
    typeof coin.current_price === "number"
      ? `$${coin.current_price.toLocaleString()}`
      : "—";

  return (
    <div className="card">
      <div className="top">
        <img src={coin.image} alt="" />
      </div>
      <div>
        <h5>{coin.name}</h5>
        <p>{price}</p>
      </div>
      {hasChange ? (
        <span className={isDown ? "red" : "green"}>
          {isDown ? (
            <FiArrowDown className="icon" />
          ) : (
            <FiArrowUpRight className="icon" />
          )}
          {change.toFixed(2)}%
        </span>
      ) : (
        <span className="green">—</span>
      )}
    </div>
  );
};

const Featured = () => {
  const [coins, setCoins] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    getMarkets()
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length) {
          setCoins(data);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="featured" id="featured">
      <div className="container">
        {/* Left side */}
        <div className="left">
          <h2>Explore top Crypto's Like Bitcoin, Ethereum and Dogecoin</h2>
          <p>Run the numbers on the top six cryptocurrencies before you invest</p>
          <Link className="btn" style={{ width: "100%" }} to="/crypto-calculator">
            Calculate Coins
          </Link>
        </div>
        {/* Right side */}
        <div className="right">
          {status === "loading" && (
            <p className="featured-note">Loading live prices…</p>
          )}
          {status === "error" && (
            <p className="featured-note featured-error">
              Live prices are unavailable right now. Refresh the page to try
              again.
            </p>
          )}
          {status === "ready" &&
            coins.slice(0, 6).map((coin) => <CoinCard key={coin.id} coin={coin} />)}
        </div>
      </div>
    </div>
  );
};

export default Featured;
