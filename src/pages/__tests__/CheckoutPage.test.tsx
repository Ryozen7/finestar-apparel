import { render, screen } from '@testing-library/react';
import CheckoutPage from '../CheckoutPage';

describe('Checkout Page', () => {
  it('renders CheckoutPage without crashing', () => {
    expect(() => render(<CheckoutPage />)).not.toThrow();
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  });
});
