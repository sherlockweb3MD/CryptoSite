import axios from "axios";

const MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false";

// CoinGecko's free tier allows ~30 requests/minute, so share one response
// across every component that needs it instead of each mounting its own call.
const CACHE_TTL = 60 * 1000;

let cache = { data: null, expiresAt: 0 };
let inFlight = null;

export function getMarkets() {
  if (cache.data && Date.now() < cache.expiresAt) {
    return Promise.resolve(cache.data);
  }

  if (!inFlight) {
    inFlight = axios
      .get(MARKETS_URL)
      .then((response) => {
        cache = { data: response.data, expiresAt: Date.now() + CACHE_TTL };
        return cache.data;
      })
      .finally(() => {
        inFlight = null;
      });
  }

  return inFlight;
}
