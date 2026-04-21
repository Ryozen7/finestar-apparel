import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "../Checkout";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCartThunk } from "../../redux/slices/cartSlice";
import { downloadReceiptPDF } from "../../utils/downloadReceiptPDF";
import { toast } from "sonner";

// mocks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/slices/cartSlice", () => ({
  clearCartThunk: jest.fn(),
}));

jest.mock("../../utils/downloadReceiptPDF", () => ({
  downloadReceiptPDF: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("Checkout Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  const mockCart = [
    {
      product: { id: "1", name: "Shirt", price: 100 },
      variant: { size: "M", color: "Red" },
      quantity: 2,
    },
  ];

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      state: {
        cartItems: mockCart,
        subtotal: 200,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders order summary", () => {
    render(<Checkout />);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText(/Shirt/)).toBeInTheDocument();
    expect(screen.getByText("Subtotal: $200.00")).toBeInTheDocument();
  });

  it("applies promo code", () => {
    render(<Checkout />);

    const input = screen.getByPlaceholderText("Promo code");

    fireEvent.change(input, { target: { value: "SAVE10" } });

    expect(
      screen.getByText("Promo applied: SAVE10 (-10%)")
    ).toBeInTheDocument();

    expect(screen.getByText("Final Total: $180.00")).toBeInTheDocument();
  });

  it("places order and shows receipt", async () => {
    jest.useFakeTimers();
    (clearCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Checkout />);

    const button = screen.getByText("Place Order");

    fireEvent.click(button);

    // fast-forward timeout
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText("Order Receipt")).toBeInTheDocument();
    });

    expect(clearCartThunk).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "Order placed successfully!"
    );

    jest.useRealTimers();
  });

  it("downloads receipt PDF", async () => {
    jest.useFakeTimers();
    (clearCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Checkout />);

    fireEvent.click(screen.getByText("Place Order"));
    jest.advanceTimersByTime(1000);

    await waitFor(() =>
      screen.getByText("Download PDF")
    );

    fireEvent.click(screen.getByText("Download PDF"));

    expect(downloadReceiptPDF).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it("navigates back to store", async () => {
    jest.useFakeTimers();
    (clearCartThunk as unknown as jest.Mock).mockReturnValue(() => Promise.resolve());

    render(<Checkout />);

    fireEvent.click(screen.getByText("Place Order"));
    jest.advanceTimersByTime(1000);

    await waitFor(() =>
      screen.getByText("Back to Store")
    );

    fireEvent.click(screen.getByText("Back to Store"));

    expect(mockNavigate).toHaveBeenCalledWith("/");

    jest.useRealTimers();
  });

  it("shows loading state", () => {
    render(<Checkout />);

    const button = screen.getByText("Place Order");

    fireEvent.click(button);

    expect(screen.getByText("Placing Order...")).toBeInTheDocument();
  });
});