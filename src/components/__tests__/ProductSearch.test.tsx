import { render, screen, fireEvent, act } from "@testing-library/react";
import ProductSearch from "../ProductSearch";

describe("ProductSearch Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders input with initial value", () => {
    render(
      <ProductSearch value="shirt" onChange={mockOnChange} loading={false} />
    );

    const input = screen.getByPlaceholderText("Search products...");
    expect(input).toHaveValue("shirt");
  });

  it("updates local input state on typing", () => {
    render(
      <ProductSearch value="" onChange={mockOnChange} loading={false} />
    );

    const input = screen.getByPlaceholderText("Search products...");

    fireEvent.change(input, { target: { value: "pants" } });

    expect(input).toHaveValue("pants");
  });

  it("debounces onChange call (400ms)", async () => {
    render(
      <ProductSearch value="" onChange={mockOnChange} loading={false} />
    );

    const input = screen.getByPlaceholderText("Search products...");

    fireEvent.change(input, { target: { value: "shoe" } });

    // should NOT call immediately
    expect(mockOnChange).not.toHaveBeenCalled();

    await act(async () => {
    // fast-forward debounce
    jest.advanceTimersByTime(400);
    });

    expect(mockOnChange).toHaveBeenCalledWith("shoe");
  });

  it("resets debounce when typing quickly", async () => {
    render(
      <ProductSearch value="" onChange={mockOnChange} loading={false} />
    );

    const input = screen.getByPlaceholderText("Search products...");

    fireEvent.change(input, { target: { value: "s" } });
    fireEvent.change(input, { target: { value: "sh" } });
    fireEvent.change(input, { target: { value: "shoe" } });

    await act(async () => {
    jest.advanceTimersByTime(400);
    });

    // only last value should be sent
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("shoe");
  });


  it("syncs when external value changes", () => {
    const { rerender } = render(
      <ProductSearch value="initial" onChange={mockOnChange} loading={false} />
    );

    rerender(
      <ProductSearch value="updated" onChange={mockOnChange} loading={false} />
    );

    const input = screen.getByPlaceholderText("Search products...");
    expect(input).toHaveValue("updated");
  });
});