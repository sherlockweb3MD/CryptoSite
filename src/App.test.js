import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { getMarkets } from "./api/coingecko";

jest.mock("./api/coingecko", () => ({ getMarkets: jest.fn() }));

beforeEach(() => {
  getMarkets.mockResolvedValue([]);
});

test("renders the ViCoin home page", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /invest in cryptocurrency/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Calculate" })).toBeInTheDocument();
  expect(document.title).toBe("ViCoin — Crypto calculator & live prices");

  // Flush the markets request so its state update lands inside act().
  await screen.findByText(/Live prices are unavailable right now/i);
});
