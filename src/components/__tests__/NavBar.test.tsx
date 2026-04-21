import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";

// mocks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../../redux/slices/themeSlice", () => ({
  toggleTheme: jest.fn(),
}));

describe("NavBar Component", () => {
  const mockDispatch = jest.fn();

  const setup = (overrides?: any) => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({
        theme: { darkMode: false },
        cart: {
          items: [
            { quantity: 2 },
            { quantity: 1 },
          ],
        },
        ...overrides,
      })
    );

    return render(<NavBar />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and cart", () => {
    setup();

    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Cart")).toBeInTheDocument();
  });

  it("displays cart item count", () => {
    setup();

    // total = 3
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("toggles menu when hamburger is clicked", () => {
    setup();

    const menuBtn = screen.getByLabelText("Menu");

    // menu closed initially
    expect(screen.queryByText(/Dark Mode/i)).not.toBeInTheDocument();

    fireEvent.click(menuBtn);

    // menu opens
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
  });

  it("dispatches toggleTheme when clicking theme button", () => {
    setup();

    fireEvent.click(screen.getByLabelText("Menu"));

    const themeBtn = screen.getByLabelText("Toggle theme");

    fireEvent.click(themeBtn);

    expect(toggleTheme).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("shows Light Mode when darkMode is true", () => {
    setup({
      theme: { darkMode: true },
      cart: { items: [] },
    });

    fireEvent.click(screen.getByLabelText("Menu"));

    expect(screen.getByText(/Light Mode/i)).toBeInTheDocument();
  });

  it("does not show cart count when empty", () => {
    setup({
      theme: { darkMode: false },
      cart: { items: [] },
    });

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});