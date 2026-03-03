import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Label } from './Label';

expect.extend(toHaveNoViolations);

describe('Label (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Label htmlFor="test">Email</Label>);
            expect(screen.getByText('Email').tagName).toBe('LABEL');
        });

        it('applies size classes', () => {
            const { unmount } = render(<Label htmlFor="test" size="sm">Small</Label>);
            expect(screen.getByText('Small')).toHaveClass('text-xs');
            unmount();
            render(<Label htmlFor="test" size="md">Medium</Label>);
            expect(screen.getByText('Medium')).toHaveClass('text-sm');
        });

        it('shows required indicator', () => {
            render(<Label htmlFor="test" required>Email</Label>);
            expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('applies disabled styling', () => {
            render(<Label htmlFor="test" disabled>Email</Label>);
            expect(screen.getByText('Email')).toHaveClass('opacity-70');
        });

        it('merges custom className', () => {
            render(<Label htmlFor="test" className="custom">Email</Label>);
            expect(screen.getByText('Email')).toHaveClass('custom');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <>
                    <Label htmlFor="email">Email</Label>
                    <input id="email" type="email" />
                </>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
