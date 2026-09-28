import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/react hooks demo/i);
  expect(linkElement).toBeInTheDocument();
});
