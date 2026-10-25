import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import Crypto from '../Assets/hero-img.png'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="left">
          <span className="badge">
            <span className="badge-dot" aria-hidden="true"></span>
            Live prices from CoinGecko
          </span>
          <h1>
            Invest in cryptocurrency with{' '}
            <span className="grad-text">your IRA</span>
          </h1>
          <p className="lede">
            Buy, sell and hold hundreds of assets — then see exactly what your
            position is worth before you move a cent.
          </p>
          <div className="cta-row">
            <Link className="btn" to="/crypto-calculator">
              Try the calculator
            </Link>
            <Link className="btn btn-ghost" to="/#featured">
              Explore live prices
            </Link>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>6</strong>
              <span>top coins tracked</span>
            </li>
            <li>
              <strong>60s</strong>
              <span>price refresh</span>
            </li>
            <li>
              <strong>$0</strong>
              <span>cost to use</span>
            </li>
          </ul>
        </div>
        <div className="right">
          <div className="img-frame">
            <img
              src={Crypto}
              alt="Crypto portfolio dashboard showing asset allocation and balances"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
