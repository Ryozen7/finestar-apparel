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

---

## Ionic Framework Integration

### Setup

The project uses the [Ionic Framework](https://ionicframework.com/docs/react) for modern, mobile-friendly UI components and navigation. Ionic was added with:

```sh
npm install @ionic/react @ionic/react-router ionicons
```

### Integration Details
- The app is wrapped with `<IonApp>` and `<IonReactRouter>` in `src/index.tsx` to provide Ionic context and routing.
- Routing uses `<IonRouterOutlet>` and Ionic's `<IonPage>`, `<IonContent>` for each page.
- Navigation links use `<IonLink>` or `<IonRouterLink>` for SPA navigation.
- UI elements such as lists, buttons, cards, and inputs are built with Ionic components (`IonList`, `IonItem`, `IonButton`, `IonInput`, `IonCard`, etc.) for a consistent look and feel.
- Standard HTML elements in pages/components were replaced with their Ionic equivalents for better mobile and desktop UX.

See the code in `src/index.tsx`, `src/App.tsx`, and the main pages/components for examples of Ionic usage.