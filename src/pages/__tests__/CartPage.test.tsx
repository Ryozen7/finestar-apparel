import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import  store  from "../../store";
import CartPage from "../CartPage";

describe("Cart Page", () => {
  it("renders CartPage correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });
});