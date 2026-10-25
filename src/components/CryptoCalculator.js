import React, { useState, useEffect } from "react";
import { GoInfo } from "react-icons/go";
import { getMarkets } from "../api/coingecko";
import usePageTitle from "../hooks/usePageTitle";
import "./CryptoCalculator.css";

function CryptoCalculator() {
  usePageTitle(
    "Investment calculator — ViCoin",
    "Calculate the potential profit or loss on a cryptocurrency investment using live prices."
  );

  const [initialPrice, setInitialPrice] = useState("");
  const [investment, setInvestment] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [total, setTotal] = useState("");
  const [profit, setProfit] = useState("");
  const [warning, setWarning] = useState("");
  const [coins, setCoins] = useState([]);
  const [marketsError, setMarketsError] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("select");

  useEffect(() => {
    let cancelled = false;

    getMarkets()
      .then((data) => {
        if (cancelled) return;
        setCoins(Array.isArray(data) ? data : []);
        setMarketsError(!Array.isArray(data) || data.length === 0);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setMarketsError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Dismiss a validation message as soon as the user edits an input. Submitting
  // never changes these values, so a message shown on submit stays put.
  useEffect(() => {
    setWarning("");
  }, [initialPrice, investment, newPrice]);

  const handleCoinChange = (e) => {
    const coinId = e.target.value;
    setSelectedCoin(coinId);

    if (coinId !== "select") {
      const selected = coins.find((coin) => coin.id === coinId);
      if (selected) {
        setNewPrice(selected.current_price);
      }
    } else {
      setNewPrice("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const initial = parseFloat(initialPrice);
    const invest = parseFloat(investment);
    const newP = parseFloat(newPrice);

    if (
      isNaN(initial) ||
      isNaN(invest) ||
      isNaN(newP) ||
      initial <= 0 ||
      invest <= 0
    ) {
      // Drop any results from a previous calculation so they can't sit on
      // screen next to the error message.
      setTotal("");
      setProfit("");
      setWarning("Please enter valid numbers greater than zero.");
      return;
    }

    const coinBought = invest / initial;
    const currentValue = coinBought * newP;
    const netProfit = currentValue - invest;

    setWarning("");
    setTotal(`Total: $${Number(currentValue.toFixed(2)).toLocaleString()}`);
    setProfit(`Profit: $${Number(netProfit.toFixed(2)).toLocaleString()}`);
  };

  return (
    <main className="calc-container">
      <div className="info">
        <GoInfo className="info-icon" />
        <p className="explanation">
          Select a coin from the dropdown to auto-fill the New Price (optional)
          or enter it manually. Provide the Initial Price and your Investment
          Amount, then click Calculate to view your profit or loss.
        </p>
      </div>
      <div className="calc-cont">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="calc-label" htmlFor="coin-select">
              Select Coin:
            </label>
            <select
              id="coin-select"
              value={selectedCoin}
              onChange={handleCoinChange}
            >
              <option value="select">--- Select coin ---</option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="calc-label" htmlFor="initial-price">
              Initial Price:
            </label>
            <input
              autoFocus
              type="number"
              placeholder="$"
              id="initial-price"
              value={initialPrice}
              onChange={(e) => setInitialPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="calc-label" htmlFor="investment">
              Investment:
            </label>
            <input
              type="number"
              id="investment"
              placeholder="$"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
            />
          </div>

          <div>
            <label className="calc-label" htmlFor="new-price">
              New Price:
            </label>
            <input
              type="number"
              id="new-price"
              placeholder="$"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              readOnly={selectedCoin !== "select"}
            />
          </div>

          <button type="submit" className="btn calc-submit-btn">
            Calculate
          </button>
        </form>

        {marketsError && (
          <span className="note">
            Live prices could not be loaded — you can still enter the New Price
            manually.
          </span>
        )}
        {warning && <span className="warning">{warning}</span>}
        <div className="totalPrice">
          <p className="calc-total">{total}</p>
          <p className="calc-profit">{profit}</p>
        </div>
      </div>
    </main>
  );
}

export default CryptoCalculator;
