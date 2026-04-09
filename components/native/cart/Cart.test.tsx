import { render } from '@testing-library/react-native';
import { Cart } from './Cart';
describe('Cart (Native)', () => { it('renders', () => { const { toJSON } = render(<Cart items={[{ id: '1', name: 'X', price: 10, quantity: 1 }]} />); expect(toJSON()).not.toBeNull(); }); });
