import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PricingTablePrimitive } from './PricingTable';
expect.extend(toHaveNoViolations);
const tiers = [{ id: '1', name: 'Free', price: 0, features: ['Feature 1'] }, { id: '2', name: 'Pro', price: 29, period: 'mo', features: ['All free', 'Pro'] }];
describe('PricingTablePrimitive', () => {
    it('renders tiers', () => { render(<PricingTablePrimitive tiers={tiers} />); expect(screen.getByText('Free')).toBeInTheDocument(); expect(screen.getByText('Pro')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<PricingTablePrimitive tiers={tiers} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<PricingTablePrimitive ref={ref} tiers={tiers} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
