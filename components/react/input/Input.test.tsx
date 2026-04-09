import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input (Styled)', () => {
    describe('rendering', () => {
        it('renders with default variant (default) and size (md)', () => {
            render(<Input aria-label="test" />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
            expect(input).toHaveClass('border-input');
            expect(input).toHaveClass('h-10');
        });

        it('applies correct classes for each variant', () => {
            const variants = [
                { variant: 'default' as const, expected: 'border-input' },
                { variant: 'ghost' as const, expected: 'border-transparent' },
            ];

            for (const { variant, expected } of variants) {
                const { unmount } = render(
                    <Input variant={variant} aria-label={variant} />,
                );
                expect(screen.getByRole('textbox')).toHaveClass(expected);
                unmount();
            }
        });

        it('applies correct classes for each size', () => {
            const sizes = [
                { size: 'sm' as const, expected: 'h-8' },
                { size: 'md' as const, expected: 'h-10' },
                { size: 'lg' as const, expected: 'h-12' },
            ];

            for (const { size, expected } of sizes) {
                const { unmount } = render(
                    <Input size={size} aria-label={size} />,
                );
                expect(screen.getByRole('textbox')).toHaveClass(expected);
                unmount();
            }
        });

        it('merges custom className', () => {
            render(<Input className="custom-class" aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveClass('custom-class');
        });

        it('applies disabled styles when isDisabled', () => {
            render(<Input isDisabled aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveClass('opacity-50');
        });

        it('applies error styles when isInvalid', () => {
            render(<Input isInvalid aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveClass('border-destructive');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations for every variant', async () => {
            const variants = ['default', 'ghost'] as const;

            for (const variant of variants) {
                const { container, unmount } = render(
                    <Input variant={variant} aria-label={`${variant} input`} />,
                );
                const results = await axe(container);
                expect(results).toHaveNoViolations();
                unmount();
            }
        });

        it('has no axe violations for every size', async () => {
            const sizes = ['sm', 'md', 'lg'] as const;

            for (const size of sizes) {
                const { container, unmount } = render(
                    <Input size={size} aria-label={`${size} input`} />,
                );
                const results = await axe(container);
                expect(results).toHaveNoViolations();
                unmount();
            }
        });

        it('has no axe violations when disabled', async () => {
            const { container } = render(
                <Input isDisabled aria-label="disabled input" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when invalid', async () => {
            const { container } = render(
                <Input isInvalid aria-label="invalid input" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when read-only', async () => {
            const { container } = render(
                <Input isReadOnly defaultValue="read only" aria-label="readonly input" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
