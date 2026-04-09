import { render } from '@testing-library/react-native';
import { PricingTable } from './PricingTable';
describe('PricingTable (Native)', () => { it('renders', () => { const { toJSON } = render(<PricingTable tiers={[{ id: '1', name: 'Free', price: 0, features: [] }]} />); expect(toJSON()).not.toBeNull(); }); });
