import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { MemoryRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../redux/slices/themeSlice", () => ({
  toggleTheme: jest.fn(),
}));

describe("NavBar Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({
        theme: { darkMode: false },
        cart: { items: [] },
      })
    );
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

  it("shows Light Mode when darkMode is true", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((cb) =>
      cb({
        theme: { darkMode: true },
        cart: { items: [] },
      })
    );

    setup();

    fireEvent.click(screen.getByLabelText("Menu"));

    expect(screen.getByText(/Light Mode/i)).toBeInTheDocument();
  });
});