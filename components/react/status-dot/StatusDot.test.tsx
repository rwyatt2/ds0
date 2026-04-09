import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { StatusDot } from './StatusDot';

expect.extend(toHaveNoViolations);

describe('StatusDot (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<StatusDot label="Status" />);
            expect(screen.getByRole('status')).toBeInTheDocument();
        });

        it('applies variant classes', () => {
            const { container } = render(<StatusDot variant="online" label="Online" />);
            const dot = container.querySelector('[aria-hidden="true"]');
            expect(dot).toHaveClass('bg-emerald-500');
        });

        it('applies size classes', () => {
            const { container } = render(<StatusDot size="lg" label="Status" />);
            const dot = container.querySelector('[aria-hidden="true"]');
            expect(dot).toHaveClass('h-4', 'w-4');
        });

        it('renders pulse animation when pulse is true', () => {
            const { container } = render(<StatusDot variant="online" pulse label="Online" />);
            const pulseElements = container.querySelectorAll('[aria-hidden="true"]');
            expect(pulseElements.length).toBe(2);
            expect(pulseElements[1]).toHaveClass('animate-ping');
        });

        it('does not render pulse when pulse is false', () => {
            const { container } = render(<StatusDot variant="online" label="Online" />);
            const pulseElements = container.querySelectorAll('[aria-hidden="true"]');
            expect(pulseElements.length).toBe(1);
        });

        it('merges custom className', () => {
            render(<StatusDot className="custom-class" label="Status" />);
            expect(screen.getByRole('status')).toHaveClass('custom-class');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<StatusDot variant="online" label="Online" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations with pulse', async () => {
            const { container } = render(<StatusDot variant="error" pulse label="Error" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
