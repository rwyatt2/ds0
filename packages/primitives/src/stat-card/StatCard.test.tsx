import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { StatCardPrimitive } from './StatCard';
expect.extend(toHaveNoViolations);

describe('StatCardPrimitive', () => {
    it('renders label and value', () => { render(<StatCardPrimitive label="Revenue" value="$12,345" />); expect(screen.getByRole('group')).toBeInTheDocument(); expect(screen.getByText('Revenue')).toBeInTheDocument(); expect(screen.getByText('$12,345')).toBeInTheDocument(); });
    it('renders trend', () => { render(<StatCardPrimitive label="Users" value="1,234" trend={12} />); expect(screen.getByText(/12%/)).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<StatCardPrimitive label="Test" value="123" />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<StatCardPrimitive ref={ref} label="T" value="1" />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
