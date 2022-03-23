import React from 'react';
import { render, screen } from '@testing-library/react';
import FrenMoney from './App';

test('renders learn react link', () => {
  render(<FrenMoney />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
