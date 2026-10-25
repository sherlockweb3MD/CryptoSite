import React from "react";
import { FiTrendingUp, FiZap, FiShield } from "react-icons/fi";
import "./Features.css";

const FEATURES = [
  {
    icon: <FiTrendingUp />,
    title: "Live market data",
    body: "The top six coins by market cap with current price and 24-hour movement, refreshed every minute.",
  },
  {
    icon: <FiZap />,
    title: "Instant profit & loss",
    body: "Enter three numbers and see your position value and net result immediately — no account, no waiting.",
  },
  {
    icon: <FiShield />,
    title: "Nothing stored",
    body: "The calculator runs entirely in your browser. Nothing you type is sent anywhere or saved.",
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="features-head">
          <span className="eyebrow">Why ViCoin</span>
          <h2>Built to give you a straight answer</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h5>{feature.title}</h5>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
