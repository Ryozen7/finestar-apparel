import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Page', () => {
  it('renders the hero section', () => {
    expect(() => render(<Home />)).not.toThrow();
    expect(screen.getByText(/Finestar/i)).toBeInTheDocument();
  });
});
