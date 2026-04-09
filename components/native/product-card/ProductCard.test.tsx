import { render } from '@testing-library/react-native';
import { ProductCard } from './ProductCard';
describe('ProductCard (Native)', () => { it('renders', () => { const { toJSON } = render(<ProductCard name="X" price={10} />); expect(toJSON()).not.toBeNull(); }); });
