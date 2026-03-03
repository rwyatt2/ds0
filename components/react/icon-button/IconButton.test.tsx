import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { IconButton } from './IconButton';

expect.extend(toHaveNoViolations);
const TestIcon = () => <svg data-testid="icon" aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>;

describe('IconButton (Styled)', () => {
    it('renders with aria-label', () => {
        render(<IconButton icon={<TestIcon />} aria-label="Close" />);
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });
    it('applies variant classes', () => {
        render(<IconButton icon={<TestIcon />} aria-label="Close" variant="primary" />);
        expect(screen.getByRole('button')).toHaveClass('bg-primary');
    });
    it('applies size classes', () => {
        render(<IconButton icon={<TestIcon />} aria-label="Close" size="sm" />);
        expect(screen.getByRole('button')).toHaveClass('h-8', 'w-8');
    });
    it('merges className', () => {
        render(<IconButton icon={<TestIcon />} aria-label="Close" className="custom" />);
        expect(screen.getByRole('button')).toHaveClass('custom');
    });
    it('has no axe violations', async () => {
        const { container } = render(<IconButton icon={<TestIcon />} aria-label="Close" />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
