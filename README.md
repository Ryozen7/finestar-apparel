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
- The Ionic UI implementation is basic and may not fully leverage advanced Ionic theming, transitions, or mobile best practices due to limited experience with the framework.

---

## Ionic Framework (feat-ionic-extension branch)

### Try the Ionic UI Version

To use the Ionic Framework integration, checkout the dedicated branch:

```sh
# Make sure you have cloned the repo
git checkout feat-ionic-extension
npm install
npm run dev
```

#### Installation
To add Ionic Framework to this project, the following packages were installed:

```sh
npm install @ionic/react @ionic/react-router ionicons
```

This brings in the core Ionic React components, router integration, and icon set.

### How Ionic is Integrated
- The app is wrapped with `<IonApp>` and `<IonReactRouter>` in `src/index.tsx` for Ionic context and routing.
- Routing uses `<IonRouterOutlet>`, `<IonPage>`, `<IonContent>`, and `<IonHeader>` for each page.
- Navigation links use `<IonLink>` or `<IonRouterLink>` for SPA navigation.
- UI elements such as lists, buttons, cards, and inputs are not fully integrated with Ionic components (`IonList`, `IonItem`, `IonButton`, `IonInput`, `IonCard`, etc.) due to knowledge limitations.
- Product modals and dialogs use `<IonModal>` for native mobile-style overlays.

See the code in `src/index.tsx`, `src/App.tsx`, and the main pages/components for examples of Ionic usage.