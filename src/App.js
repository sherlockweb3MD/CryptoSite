import React from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import CryptoCalculator from "./components/CryptoCalculator";
import { Analytics } from "@vercel/analytics/react";
import PageNotFound from "./components/PageNotFound";
import ScrollToHash from "./components/ScrollToHash";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto-calculator" element={<CryptoCalculator />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <Analytics />
      <ScrollToHash />
    </>
  );
}

export default App;
