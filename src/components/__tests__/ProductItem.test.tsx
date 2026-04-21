import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductItem from "../ProductItem";

// mock ProductModal (IMPORTANT)
jest.mock("../ProductModal", () => (props: any) => {
  if (!props.open) return null;

  return (
    <div data-testid="modal">
      <button
        onClick={() =>
          props.onAdd({
            size: "M",
            color: "Red",
            price: 100,
          })
        }
      >
        Confirm Add
      </button>
      <button onClick={props.onClose}>Close</button>
      {props.loading && <span>Loading...</span>}
    </div>
  );
});

describe("ProductItem Component", () => {
  const mockProduct = {
    id: "1",
    name: "Shirt",
    category: "Clothing",
    price: 120,
    image: "test.jpg",
    variants: [
      { size: "M", color: "Red", price: 100 },
      { size: "L", color: "Blue", price: 110 },
    ],
  };

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product info", () => {
    render(
      <ProductItem product={mockProduct} onAddToCart={mockAddToCart} />
    );

    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();

    // lowest variant price = 100
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("opens modal when clicking Add to Cart", () => {
    render(
      <ProductItem product={mockProduct} onAddToCart={mockAddToCart} />
    );

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("calls onAddToCart and closes modal", async () => {
    mockAddToCart.mockResolvedValueOnce(undefined);

    render(
      <ProductItem product={mockProduct} onAddToCart={mockAddToCart} />
    );

    fireEvent.click(screen.getByText("Add to Cart"));

    fireEvent.click(screen.getByText("Confirm Add"));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(
        mockProduct,
        expect.objectContaining({
          size: "M",
          color: "Red",
        })
      );
    });

    // modal should close after add
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  it("shows loading state while adding", async () => {
    let resolvePromise: any;

    const promise = new Promise((res) => {
      resolvePromise = res;
    });

    mockAddToCart.mockReturnValue(promise);

    render(
      <ProductItem product={mockProduct} onAddToCart={mockAddToCart} />
    );

    fireEvent.click(screen.getByText("Add to Cart"));
    fireEvent.click(screen.getByText("Confirm Add"));

    // loading visible
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    resolvePromise();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });


  it("handles image error fallback", () => {
    render(
      <ProductItem product={mockProduct} onAddToCart={mockAddToCart} />
    );

    const img = screen.getByAltText("Shirt");

    fireEvent.error(img);

    // fallback div becomes visible
    expect(screen.getAllByText("No image found").length).toBeGreaterThan(0);
  });
});