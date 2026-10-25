import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import Crypto from '../Assets/trade.png'

const Signup = () => {
  return (
    <div className='signup'>
        <div className="container">
            {/* Left */}
            <div className="left">
                <img src={Crypto} alt="Illustration of earning rewards from crypto holdings" />
            </div>
            {/* Right */}
            <div className="right">
                <h2>Earn passive income with crypto</h2>
                <p>Earn up to 12% annual rewards on 30+ digital assets. Simply hold your assets in the app to automatically earn rewards at the end of each month with no lockups and no limits.</p>
                <div className="input-container">
                    <Link to="/#featured">
                        <button className="btn">Explore coins</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
