import { render, screen } from '@testing-library/react';
import CartPage from '../CartPage';

describe('Cart Page', () => {
  it('renders CartPage without crashing', () => {
    expect(() => render(<CartPage />)).not.toThrow();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
