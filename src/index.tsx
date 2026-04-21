import "./styles/main.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Server, Response } from "miragejs";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

new Server({
  routes() {
    this.namespace = "api";
    // Load cart from localStorage or initialize
    function loadCart() {
      try {
        const stored = localStorage.getItem("mirage_cart");
        if (stored) return JSON.parse(stored);
      } catch {}
      return { id: "1", items: [] };
    }
    function saveCart(cart: { id: string; items: any[] }) {
      try {
        localStorage.setItem("mirage_cart", JSON.stringify(cart));
      } catch {}
    }
    let cart = loadCart();

    this.get("/products", () => [
      {
        id: "1",
        name: "Classic White Shirt",
        price: 34.99, // default price is the smallest variant
        category: "Shirts",
        variants: [
          { size: "S", color: "White", price: 34.99 },
          { size: "M", color: "White", price: 39.99 },
          { size: "L", color: "White", price: 44.99 },
        ],
        image: "",
      },
      {
        id: "2",
        name: "Slim Fit Jeans",
        price: 54.99,
        category: "Pants",
        variants: [
          { size: "32", color: "Blue", price: 54.99 },
          { size: "34", color: "Blue", price: 59.99 },
        ],
        image: "",
      },
      {
        id: "3",
        name: "Summer Dress",
        price: 44.99,
        category: "Dresses",
        variants: [
          { size: "S", color: "Red", price: 44.99 },
          { size: "M", color: "Red", price: 49.99 },
        ],
        image: "",
      },
    ]);

    // GET /api/cart
    this.get("/cart", () => {
      cart = loadCart();
      return cart;
    });

    // POST /api/cart (replace items)
    this.post("/cart", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      if (!Array.isArray(attrs.items)) {
        return new Response(400, {}, { error: "Items must be an array" });
      }
      cart = { ...cart, items: attrs.items };
      saveCart(cart);
      return cart;
    });

    // POST /api/cart/clear
    this.post("/cart/clear", () => {
      cart = { ...cart, items: [] };
      saveCart(cart);
      return cart;
    });
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
