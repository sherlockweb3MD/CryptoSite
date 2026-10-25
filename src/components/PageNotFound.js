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
    <div className="pageNotFound">
      <h1>404 - Page Not Found</h1>
      <p>
        Return{" "}
        <Link to="/">
          <span>Home</span>
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
