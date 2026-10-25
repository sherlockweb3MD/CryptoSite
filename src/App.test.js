import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { getMarkets } from "./api/coingecko";

jest.mock("./api/coingecko", () => ({ getMarkets: jest.fn() }));

beforeEach(() => {
  getMarkets.mockResolvedValue([]);
});

// Renders the app and waits for the mocked markets request to settle, so
// its state update happens inside act() instead of after the test body.
async function renderHome() {
  const utils = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  await screen.findByText(/Live prices are unavailable right now/i);
  return utils;
}

test("renders the ViCoin home page", async () => {
  await renderHome();

  expect(
    screen.getByRole("heading", { name: /invest in cryptocurrency/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Calculate" })).toBeInTheDocument();
  expect(document.title).toBe("ViCoin — Crypto calculator & live prices");
});

test("footer only links to destinations that exist", async () => {
  await renderHome();

  expect(screen.getByRole("link", { name: "Source Code" })).toHaveAttribute(
    "href",
    "https://github.com/sherlockweb3MD/CryptoSite"
  );

  // the placeholder destinations that used to point at "/"
  expect(screen.queryByText("Contact")).toBeNull();
  expect(screen.queryByText("Connect Wallet")).toBeNull();
  expect(screen.queryByText("Privacy")).toBeNull();
  expect(screen.queryByText("FAQ")).toBeNull();
});

test("calls to action are links rather than nested button-inside-link", async () => {
  await renderHome();

  expect(
    screen.getByRole("link", { name: "Try the calculator" })
  ).toHaveAttribute("href", "/crypto-calculator");
  expect(screen.getByRole("link", { name: "Explore coins" })).toHaveAttribute(
    "href",
    "/#featured"
  );
  expect(
    screen.getByRole("link", { name: "Calculate Coins" })
  ).toHaveAttribute("href", "/crypto-calculator");
});
