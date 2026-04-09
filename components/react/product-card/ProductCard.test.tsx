import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
describe('ProductCard (Styled)', () => { it('renders', () => { render(<ProductCard name="X" price={10} />); expect(screen.getByText('X')).toBeInTheDocument(); }); });
