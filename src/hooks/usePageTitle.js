import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "ViCoin: Track top cryptocurrencies, calculate investments, and explore the crypto market with ease";

/**
 * Sets the document title and meta description for the current route.
 * Every route calls this, so there is no need to restore the previous
 * value on unmount - the next route overwrites it immediately.
 */
function usePageTitle(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
}

export default usePageTitle;
