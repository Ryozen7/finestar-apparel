import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProductList from "../ProductList";
import { useDispatch, useSelector } from "react-redux";
import { saveCartThunk, fetchCartThunk } from "../../redux/slices/cartSlice";

// mocks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../redux/slices/cartSlice", () => ({
  saveCartThunk: jest.fn(),
  fetchCartThunk: jest.fn(),
}));

// mock ProductItem
jest.mock("../ProductItem", () => (props: any) => (
  <div data-testid="product-item">
    <span>{props.product.name}</span>
    <button
      onClick={() =>
        props.onAddToCart(props.product, {
          size: "M",
          color: "Red",
          price: props.product.price,
        })
      }
    >
      Add
    </button>
  </div>
));

// mock ProductSearch
jest.mock("../ProductSearch", () => (props: any) => (
  <input
    placeholder="search"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
  />
));

describe("ProductList Component", () => {
  const mockDispatch = jest.fn();

  const mockProducts = [
    {
      id: "1",
      name: "Shirt",
      category: "Clothing",
      price: 100,
      variants: [],
    },
    {
      id: "2",
      name: "Pants",
      category: "Clothing",
      price: 200,
      variants: [],
    },
  ];

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({
        cart: { items: [] },
      })
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading initially", () => {
    render(<ProductList />);
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("renders products after fetch", async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Shirt")).toBeInTheDocument();
      expect(screen.getByText("Pants")).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it("filters products by search", async () => {
    render(<ProductList />);

    await waitFor(() => screen.getByText("Shirt"));

    const input = screen.getByPlaceholderText("search");

    fireEvent.change(input, { target: { value: "pants" } });

    await waitFor(() => {
      expect(screen.getByText("Pants")).toBeInTheDocument();
      expect(screen.queryByText("Shirt")).not.toBeInTheDocument();
    });
  });

  it("sorts products by price", async () => {
    render(<ProductList />);

    await waitFor(() => screen.getByText("Shirt"));

    const select = screen.getByDisplayValue("Name");

    fireEvent.change(select, { target: { value: "price" } });

    const items = screen.getAllByTestId("product-item");

    // first should be cheaper item (Shirt: 100)
    expect(items[0]).toHaveTextContent("Shirt");
  });

  it("toggles sort order", async () => {
    render(<ProductList />);

    await waitFor(() => screen.getByText("Shirt"));

    const select = screen.getByDisplayValue("Name");
    fireEvent.change(select, { target: { value: "price" } });

    const toggleBtn = screen.getByText("↑");

    fireEvent.click(toggleBtn);

    const items = screen.getAllByTestId("product-item");

    // now descending → most expensive first
    expect(items[0]).toHaveTextContent("Pants");
  });

  it("adds new item to cart", async () => {
    (saveCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<ProductList />);

    await waitFor(() => screen.getByText("Shirt"));

    fireEvent.click(screen.getAllByText("Add")[0]);

    await waitFor(() => {
      expect(saveCartThunk).toHaveBeenCalled();
      expect(fetchCartThunk).toHaveBeenCalled();
    });
  });

  it("increments quantity if item exists", async () => {
    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({
        cart: {
          items: [
            {
              productId: "1",
              variant: { size: "M", color: "Red" },
              quantity: 1,
              product: { id: "1", name: "Shirt", price: 100 },
            },
          ],
        },
      })
    );

    (saveCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<ProductList />);

    await waitFor(() => screen.getByText("Shirt"));

    fireEvent.click(screen.getAllByText("Add")[0]);

    await waitFor(() => {
      expect(saveCartThunk).toHaveBeenCalledWith([
        expect.objectContaining({ quantity: 2 }),
      ]);
    });
  });
});