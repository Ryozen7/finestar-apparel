import { render, screen, fireEvent } from "@testing-library/react";
import ProductModal from "../ProductModal";
import { toast } from "sonner";

// mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("ProductModal Component", () => {
  const mockOnAdd = jest.fn();
  const mockOnClose = jest.fn();

  const mockProduct = {
    id: "1",
    name: "Shirt",
    price: 100,
    category: "Clothing",
    image: "test.jpg",
    variants: [
      { size: "M", color: "Red", price: 100 },
      { size: "L", color: "Blue", price: 120 },
    ],
  };

  const setup = (props?: any) =>
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onAdd={mockOnAdd}
        onClose={mockOnClose}
        loading={false}
        {...props}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when closed", () => {
    const { container } = render(
      <ProductModal
        product={mockProduct}
        open={false}
        onAdd={mockOnAdd}
        onClose={mockOnClose}
        loading={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders product info", () => {
    setup();

    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText(/Category: Clothing/)).toBeInTheDocument();
  });

  it("sets default selected variant on open", () => {
    setup();

    // first variant price = 100
    expect(screen.getByText("Price: $100.00")).toBeInTheDocument();
  });

  it("changes variant selection", () => {
    setup();

    const select = screen.getByLabelText("Choose variant:");

    fireEvent.change(select, {
      target: { value: "L|Blue" },
    });

    expect(screen.getByText("Price: $120.00")).toBeInTheDocument();
  });

  it("calls onAdd and shows toast", () => {
    setup();

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        size: "M",
        color: "Red",
      })
    );

    expect(toast.success).toHaveBeenCalledWith("Added to cart!");
  });

  it("calls onClose when cancel is clicked", () => {
    setup();

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("disables add button if no variant", () => {
    const productNoVariants = {
      ...mockProduct,
      variants: [],
    };

    setup({ product: productNoVariants });

    const button = screen.getByText("Add to Cart");

    expect(button).toBeDisabled();
  });

  it("shows loading state", () => {
    setup({ loading: true });

    const button = screen.getByText("Add to Cart");

    expect(button).toBeDisabled();
  });

  it("falls back to default image on error", () => {
    setup({ product: { ...mockProduct, image: "" } });

    const img = screen.getByAltText("Shirt") as HTMLImageElement;

    fireEvent.error(img);

    expect(img.src).toContain("/no-image.png");
  });
});