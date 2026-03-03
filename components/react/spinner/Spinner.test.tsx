import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Spinner } from './Spinner';
expect.extend(toHaveNoViolations);
describe('Spinner (Styled)', () => {
    it('renders with role="status"', () => { render(<Spinner />); expect(screen.getByRole('status')).toBeInTheDocument(); });
    it('has default aria-label', () => { render(<Spinner />); expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading'); });
    it('accepts custom label', () => { render(<Spinner label="Processing" />); expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing'); });
    it('merges className', () => { render(<Spinner className="custom" />); expect(screen.getByRole('status')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Spinner />); expect(await axe(container)).toHaveNoViolations(); });
});
