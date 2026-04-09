import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { StatCard } from './StatCard';
expect.extend(toHaveNoViolations);

describe('StatCard (Styled)', () => {
    it('renders label and value', () => { render(<StatCard label="Revenue" value="$12,345" />); expect(screen.getByText('Revenue')).toBeInTheDocument(); expect(screen.getByText('$12,345')).toBeInTheDocument(); });
    it('renders trend indicator', () => { render(<StatCard label="Users" value="100" trend={12} />); expect(screen.getByText('12%')).toBeInTheDocument(); });
    it('merges className', () => { render(<StatCard label="T" value="1" className="custom" />); expect(screen.getByRole('group')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<StatCard label="T" value="1" />); expect(await axe(container)).toHaveNoViolations(); });
});
