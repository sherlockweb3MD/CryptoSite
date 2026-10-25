import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import Crypto from '../Assets/hero-img.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="container">
            {/* Left side */}
            <div className="left">
                {/* <p>Buy & Sell Crypto 24/7 using your retirement account</p> */}
                <h1>Invest in Cryptocurrency with Your IRA</h1>
                <p>Buy, Sell and Store hundreds of Cryptocurrencies</p>
                <div className="input-container">
                    <Link className="btn" to="/crypto-calculator">
                        Try the calculator
                    </Link>
                </div>
            </div>
            {/* Right side */}
            <div className="right">
                <div className="img-container">
                    <img src={Crypto} alt="Illustration of cryptocurrency trading" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero