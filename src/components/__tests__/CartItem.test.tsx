import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cart from "../Cart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCartThunk } from "../../redux/slices/cartSlice";
import { act } from "react";

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

  const mockCart = [
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
      cb({ cart: { items: mockCart } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders cart items", () => {
    render(<Cart />);

    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText(/Size: M/i)).toBeInTheDocument();
    expect(screen.getByText(/Color: Red/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("updates quantity", async () => {
    (saveCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Cart />);

    const input = screen.getByDisplayValue("2");

    fireEvent.change(input, { target: { value: "3" } });

    await waitFor(() => {
      expect(saveCartThunk).toHaveBeenCalledWith([
        expect.objectContaining({ quantity: 3 }),
      ]);
    });
  });

  it("removes item", async () => {
    (saveCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Cart />);

    const removeBtn = screen.getByText("Remove");

    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(saveCartThunk).toHaveBeenCalledWith([]);
    });
  });

  it("calculates subtotal correctly", () => {
    render(<Cart />);

    expect(screen.getByText("Cart Subtotal: $200.00")).toBeInTheDocument();
  });

  it("navigates to checkout", async () => {
    jest.useFakeTimers();

    render(<Cart />);

    const checkoutBtn = screen.getByText("Proceed to Checkout");

    fireEvent.click(checkoutBtn);

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/checkout", {
        state: {
          cartItems: mockCart,
          subtotal: 200,
        },
      });
    });

    jest.useRealTimers();
  });

  it("shows empty state", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ cart: { items: [] } })
    );

    render(<Cart />);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});