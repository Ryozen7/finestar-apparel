import "./styles/main.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Server, Response } from "miragejs";
import { mockProducts } from "./constants/mock-products";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import "@ionic/react/css/core.css";

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
    function saveCart(cart: { id: string; items: unknown[] }) {
      try {
        localStorage.setItem("mirage_cart", JSON.stringify(cart));
      } catch {}
    }
    let cart: { id: string; items: unknown[] } = loadCart();

    this.get("/products", () => mockProducts);

    // GET /api/cart
    this.get("/cart", () => {
      cart = loadCart();
      return cart;
    });

    // POST /api/cart (replace items)
    this.post("/cart", (_, request) => {
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
   <IonApp>
    <Provider store={store}>
      <IonReactRouter>
        <App />
      </IonReactRouter>
    </Provider>
  </IonApp>
  </StrictMode>,
);
