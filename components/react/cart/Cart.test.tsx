import { render, screen } from '@testing-library/react';
import { Cart } from './Cart';
describe('Cart (Styled)', () => { it('renders', () => { render(<Cart items={[{ id: '1', name: 'X', price: 10, quantity: 1 }]} />); expect(screen.getByText('X')).toBeInTheDocument(); }); });
