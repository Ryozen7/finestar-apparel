import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../store";
import CheckoutPage from "../CheckoutPage";

describe("Checkout Page", () => {
  it("renders CheckoutPage without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/checkout",
              state: {
                cartItems: [],
                subtotal: 100,
              },
            },
          ]}
        >
          <CheckoutPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  });
});