import { render, screen } from '@testing-library/react';
import { CartPrimitive } from './Cart';
describe('CartPrimitive', () => {
    const items = [{ id: '1', name: 'Shirt', price: 25, quantity: 2 }];
    it('renders', () => { render(<CartPrimitive items={items} />); expect(screen.getByText('Shirt')).toBeInTheDocument(); });
    it('shows total', () => { render(<CartPrimitive items={items} />); expect(screen.getByText(/Total:.*50\.00/)).toBeInTheDocument(); });
});
