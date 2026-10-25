import React from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import Features from "./Features";
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
      <Features />
    </>
  );
};

export default Home;
