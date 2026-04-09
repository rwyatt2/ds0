import { render, screen } from '@testing-library/react';
import { PricingTable } from './PricingTable';
const tiers = [{ id: '1', name: 'Free', price: 0, features: ['F1'] }];
describe('PricingTable (Styled)', () => {
    it('renders', () => { render(<PricingTable tiers={tiers} />); expect(screen.getByText('Free')).toBeInTheDocument(); });
    it('renders title', () => { render(<PricingTable tiers={tiers} title="Plans" />); expect(screen.getByText('Plans')).toBeInTheDocument(); });
});
