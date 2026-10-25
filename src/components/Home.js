import React from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import Signup from "./Signup";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle(
    "ViCoin — Crypto calculator & live prices",
    "ViCoin: Track top cryptocurrencies, calculate investments, and explore the crypto market with ease"
  );

  return (
    <>
      <Hero />
      <Featured />
      <Signup />
    </>
  );
};

export default Home;
