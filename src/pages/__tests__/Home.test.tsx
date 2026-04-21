import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store  from "../../store";
import Home from "../Home";

describe("Home Page", () => {
  it("renders hero section", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Shop Now/i)).toBeInTheDocument();
  });
});