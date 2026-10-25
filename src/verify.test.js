import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Featured from "./components/Featured";
import CryptoCalculator from "./components/CryptoCalculator";
import ScrollToHash from "./components/ScrollToHash";
import { getMarkets } from "./api/coingecko";

jest.mock("./api/coingecko", () => ({ getMarkets: jest.fn() }));

const coins = [
  { id: "bitcoin", name: "Bitcoin", image: "btc.png", current_price: 100000, price_change_percentage_24h: 1.5 },
  { id: "ethereum", name: "Ethereum", image: "eth.png", current_price: 3000, price_change_percentage_24h: -2.25 },
  { id: "tether", name: "Tether", image: "usdt.png", current_price: 1, price_change_percentage_24h: null },
  { id: "bnb", name: "BNB", image: "bnb.png", current_price: null, price_change_percentage_24h: null },
  { id: "xrp", name: "XRP", image: "xrp.png", current_price: 2, price_change_percentage_24h: 0.1 },
  { id: "solana", name: "Solana", image: "sol.png", current_price: 150, price_change_percentage_24h: -1 },
];

const renderNav = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  );

beforeEach(() => {
  jest.clearAllMocks();
  getMarkets.mockResolvedValue(coins);
});

// ---- Navbar ----

test("nav drops Contact and points Featured at the hash", () => {
  renderNav("/");

  expect(screen.queryByText("Contact")).toBeNull();
  expect(screen.getByRole("link", { name: "Featured" })).toHaveAttribute(
    "href",
    "/#featured"
  );
});

test("only the current nav item is marked active on the calculator page", () => {
  renderNav("/crypto-calculator");

  expect(screen.getByRole("link", { name: "Calculate" })).toHaveClass("active");
  expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("active");
  expect(screen.getByRole("link", { name: "Featured" })).not.toHaveClass("active");
});

test("Home is active on / and Featured is active on /#featured", () => {
  const first = renderNav("/");
  expect(screen.getByRole("link", { name: "Home" })).toHaveClass("active");
  expect(screen.getByRole("link", { name: "Featured" })).not.toHaveClass("active");
  first.unmount();

  renderNav("/#featured");
  expect(screen.getByRole("link", { name: "Featured" })).toHaveClass("active");
  expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("active");
});

// ---- Featured ----

test("featured renders coins and survives null prices/percentages", async () => {
  const { container } = render(
    <MemoryRouter>
      <Featured />
    </MemoryRouter>
  );

  expect(container.querySelector("#featured")).not.toBeNull();
  expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
  expect(await screen.findByText("Solana")).toBeInTheDocument();
  // null current_price falls back to a dash instead of throwing
  expect(screen.getAllByText("—").length).toBeGreaterThan(0);
});

test("a short API response does not crash the card list", async () => {
  getMarkets.mockResolvedValue(coins.slice(0, 2));

  render(
    <MemoryRouter>
      <Featured />
    </MemoryRouter>
  );

  expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
  expect(screen.getByText("Ethereum")).toBeInTheDocument();
  expect(screen.queryByText("Solana")).toBeNull();
});

test("featured shows a visible fallback when the API fails", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  getMarkets.mockRejectedValue(new Error("rate limited"));

  render(
    <MemoryRouter>
      <Featured />
    </MemoryRouter>
  );

  expect(
    await screen.findByText(/Live prices are unavailable right now/i)
  ).toBeInTheDocument();
  jest.restoreAllMocks();
});

// ---- CryptoCalculator ----

test("calculator clears stale results when validation fails", async () => {
  const { container } = render(<CryptoCalculator />);

  fireEvent.change(screen.getByLabelText(/initial price/i), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText(/investment/i), {
    target: { value: "1000" },
  });
  fireEvent.change(screen.getByLabelText(/new price/i), {
    target: { value: "200" },
  });

  fireEvent.submit(container.querySelector("form"));

  expect(await screen.findByText(/Total: \$2,000/)).toBeInTheDocument();
  expect(screen.getByText(/Profit: \$1,000/)).toBeInTheDocument();

  // break the form and resubmit: the old numbers must disappear
  fireEvent.change(screen.getByLabelText(/investment/i), {
    target: { value: "" },
  });
  fireEvent.submit(container.querySelector("form"));

  expect(
    await screen.findByText(/Please enter valid numbers greater than zero/)
  ).toBeInTheDocument();
  expect(screen.queryByText(/Total:/)).toBeNull();
  expect(screen.queryByText(/Profit:/)).toBeNull();
});

test("editing an input dismisses the validation warning", async () => {
  const { container } = render(<CryptoCalculator />);

  fireEvent.submit(container.querySelector("form"));
  expect(
    await screen.findByText(/Please enter valid numbers greater than zero/)
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/initial price/i), {
    target: { value: "50" },
  });

  await waitFor(() =>
    expect(
      screen.queryByText(/Please enter valid numbers greater than zero/)
    ).toBeNull()
  );
});

test("selecting a coin auto-fills the read-only New Price", async () => {
  render(<CryptoCalculator />);

  const select = await screen.findByRole("combobox");
  await screen.findByRole("option", { name: "Ethereum" });

  fireEvent.change(select, { target: { value: "ethereum" } });

  await waitFor(() => {
    expect(screen.getByLabelText(/new price/i)).toHaveValue(3000);
  });
  expect(screen.getByLabelText(/new price/i)).toHaveAttribute("readonly");
});

test("a failed price fetch shows a note instead of a silent dropdown", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  getMarkets.mockRejectedValue(new Error("offline"));

  render(<CryptoCalculator />);

  expect(
    await screen.findByText(/Live prices could not be loaded/i)
  ).toBeInTheDocument();
  jest.restoreAllMocks();
});

// ---- ScrollToHash ----

test("clicking Featured scrolls the section into view", async () => {
  Element.prototype.scrollIntoView = jest.fn();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Navbar />
      <div id="featured">featured section</div>
      <ScrollToHash />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("link", { name: "Featured" }));

  await waitFor(() =>
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    })
  );
});
