import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Cart from "../Cart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCartThunk } from "../../redux/slices/cartSlice";

// mocks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/slices/cartSlice", () => ({
  saveCartThunk: jest.fn(),
}));

describe("Cart Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  const mockCartItems = [
    {
      productId: "1",
      product: { name: "Shirt", price: 100 },
      variant: { size: "M", color: "Red" },
      quantity: 2,
    },
  ];

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ cart: { items: mockCartItems } })
    );

    jest.clearAllMocks();
  });

  it("renders grouped cart items", () => {
    render(<Cart />);

    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText(/Size: M/)).toBeInTheDocument();
    expect(screen.getByText(/Color: Red/)).toBeInTheDocument();
  });

  it("calculates item and cart subtotal correctly", () => {
    render(<Cart />);

    expect(screen.getByText("Item Total: $200.00")).toBeInTheDocument();
    expect(screen.getByText("Cart Subtotal: $200.00")).toBeInTheDocument();
  });

  it("updates quantity", async () => {
    (saveCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Cart />);

    const input = screen.getByDisplayValue("2");

    fireEvent.change(input, { target: { value: "3" } });

    await waitFor(() => {
      expect(saveCartThunk).toHaveBeenCalledWith([
        expect.objectContaining({
          quantity: 3,
        }),
      ]);
    });
  });

  it("removes item from cart", async () => {
    (saveCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Cart />);

    fireEvent.click(screen.getByText("Remove"));

    await waitFor(() => {
      expect(saveCartThunk).toHaveBeenCalledWith([]);
    });
  });

  it("shows loading state on remove button", async () => {
    let resolve: any;

    const promise = new Promise((res) => {
      resolve = res;
    });

    (saveCartThunk as unknown as jest.Mock).mockReturnValue(promise);

    render(<Cart />);

    act(() => { 
    fireEvent.click(screen.getByText("Remove"));
    });

    expect(screen.getByText("...")).toBeInTheDocument();

    resolve();

  
    await waitFor(() => {
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

  });

  it("navigates to checkout with correct state", async () => {
    jest.useFakeTimers();

    render(<Cart />);

    act(() => {
    fireEvent.click(screen.getByText("Proceed to Checkout"));
    });

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/checkout", {
        state: {
          cartItems: mockCartItems,
          subtotal: 200,
        },
      });
    });

    jest.useRealTimers();
  });

  it("disables checkout button while loading", () => {
    render(<Cart />);

    act(() => {
    fireEvent.click(screen.getByText("Proceed to Checkout"));
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows empty cart state", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ cart: { items: [] } })
    );

    render(<Cart />);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});