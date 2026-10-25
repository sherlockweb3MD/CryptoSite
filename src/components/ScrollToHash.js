import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router updates the URL but does not scroll to #hash targets itself.
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;
