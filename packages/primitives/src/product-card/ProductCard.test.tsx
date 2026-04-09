import { render, screen } from '@testing-library/react';
import { ProductCardPrimitive } from './ProductCard';
describe('ProductCardPrimitive', () => {
    it('renders', () => { render(<ProductCardPrimitive name="T-Shirt" price={29.99} />); expect(screen.getByText('T-Shirt')).toBeInTheDocument(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<ProductCardPrimitive ref={ref} name="X" price={0} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
