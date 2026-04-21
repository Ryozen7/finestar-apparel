import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../ProductList";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("ProductList", () => {
  const mockDispatch = jest.fn();
  let resolveFetch: any;

  const mockProducts = [
    { id: "1", name: "Shirt", category: "Clothing", price: 100, variants: [] },
    { id: "2", name: "Pants", category: "Clothing", price: 200, variants: [] },
  ];

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ cart: { items: [] } })
    );

    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    ) as jest.Mock;
  });

  it("renders products after fetch", async () => {
    render(<ProductList />);

    resolveFetch({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    await waitFor(() => {
      expect(screen.getByText("Shirt")).toBeInTheDocument();
      expect(screen.getByText("Pants")).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    render(<ProductList />);

    resolveFetch({
      ok: false,
    });

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});