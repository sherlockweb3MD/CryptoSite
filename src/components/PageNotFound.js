import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const PageNotFound = () => {
  usePageTitle(
    "Page not found — ViCoin",
    "The page you are looking for does not exist."
  );

  return (
    <main className="pageNotFound">
      <h1 className="code grad-text">404</h1>
      <p>
        This page doesn&rsquo;t exist — it may have been moved, or it never
        existed at all.
      </p>
      <Link className="btn" to="/">
        Back to home
      </Link>
    </main>
  );
};

export default PageNotFound;
