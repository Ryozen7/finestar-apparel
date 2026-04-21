# Finestar Apparel

A modern e-commerce demo app built with React, TypeScript, Redux Toolkit, and MirageJS.

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd finestar-apparel
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the development server**
   ```sh
   npm run dev
   ```
   The app will be available at http://localhost:5173 (or as shown in your terminal).

4. **Run type checking and formatting**
   ```sh
   npm run test:tsc   # TypeScript build check
   npm run format     # Prettier formatting
   ```

## Design Decisions

### State Shape
- **Redux Toolkit** is used for global state management (cart, products, menu, theme).
- **cart**: `{ items: CartItem[] }` — Each item includes product, variant, and quantity.
- **products**: `{ items: Product[], status, error }` — Normalized for easy lookup.
- **theme**: `{ darkMode: boolean }` — Simple toggle for dark mode.

### Component Structure
- **App.tsx**: Main layout and routing.
- **components/**: Reusable UI (Button, Input, ProductItem, Cart, Checkout, NavBar, ProductSearch, etc).
- **pages/**: Route-level containers (Home, CartPage, CheckoutPage).
- **redux/**: Slices for cart, products, menu, theme; API logic in `api/`.
- **utils/**: Helpers (discounts, PDF download).
- **MirageJS**: Mocks API endpoints for products and cart.

### Trade-offs
- **MirageJS** for local API mocking: Fast dev setup, but not production-ready.
- **Single Redux store**: Simpler, but may not scale for very large apps.
- **Debounced search**: Improves UX, but may delay fast typists.
- **Minimal error handling**: Focused on demo, not all edge cases covered.
- **No authentication**: Demo only, not suitable for real commerce.

## Known Limitations
- No backend or persistent database (all data is in-memory or localStorage).
- No user authentication or order history.
- No payment integration (checkout is simulated only).
- Limited product catalog (mock data only).
- Minimal accessibility and mobile responsiveness.
- Error handling is basic; not all edge cases are covered.
- PDF receipt is generated client-side and may not be pixel-perfect.

---

For questions or suggestions, please open an issue or contact the maintainer.
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
