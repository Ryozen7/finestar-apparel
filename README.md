# Finestar Apparel

A modern e-commerce demo app built with React, TypeScript, Redux Toolkit, and MirageJS.

---

## Setup Instructions

### 1. Clone the repository
```sh
git clone <repo-url>
cd finestar-apparel
```

### 2. Install dependencies
```sh
npm install
```

### 3. Start the development server
```sh
npm run dev
```

The app will be available at:
http://localhost:5173 (or as shown in your terminal)

---

## Run Type Checking and Formatting

```sh
npm run test:tsc   # TypeScript build check
npm run format     # Prettier formatting
```

---

## Testing Setup (Jest)

This project uses:

- Jest
- React Testing Library
- ts-jest
- jsdom environment

---

### Install testing dependencies

```sh
npm install -D jest ts-jest @types/jest jest-environment-jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

---

### Jest Configuration

Create `jest.config.cjs`:

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/pages/**/*.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
```

---

### Setup file

Create `src/setupTests.ts`:

```ts
import "@testing-library/jest-dom";
```

---

### Run tests

```sh
npm test
```

---

### Run coverage

```sh
npm test:coverage
```

---

## Design Decisions

### State Shape
- Redux Toolkit used for global state management (cart, products, menu, theme)
- cart: `{ items: CartItem[] }`
- products: `{ items, status, error }`
- theme: `{ darkMode: boolean }`

---

### Component Structure
- App.tsx: main layout and routing
- components/: reusable UI components
- pages/: route-level pages
- redux/: slices + API logic
- utils/: helper functions
- MirageJS: mock API layer

---

## Trade-offs

- MirageJS used for mock API (fast, not production-ready)
- Single Redux store (simple, less scalable)
- Debounced search improves UX but adds delay
- Checkout is simulated only (no backend)
- Minimal error handling (demo-focused)

---

## Known Limitations

- No backend/database
- No authentication
- No real payments
- Limited product dataset
- PDF generation is client-side only
```