import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button (Styled)', () => {
    describe('rendering', () => {
        it('renders with default variant (primary) and size (md)', () => {
            render(<Button>Click me</Button>);
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('bg-primary');
            expect(button).toHaveClass('h-10');
        });

        it('applies correct classes for each variant', () => {
            const variants = [
                { variant: 'primary' as const, expected: 'bg-primary' },
                { variant: 'secondary' as const, expected: 'bg-secondary' },
                { variant: 'destructive' as const, expected: 'bg-destructive' },
                { variant: 'ghost' as const, expected: 'hover:bg-accent' },
                { variant: 'outline' as const, expected: 'border' },
            ];

            for (const { variant, expected } of variants) {
                const { unmount } = render(
                    <Button variant={variant}>{variant}</Button>,
                );
                expect(screen.getByRole('button')).toHaveClass(expected);
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
                const { unmount } = render(<Button size={size}>{size}</Button>);
                expect(screen.getByRole('button')).toHaveClass(expected);
                unmount();
            }
        });

        it('merges custom className', () => {
            render(<Button className="custom-class">Click me</Button>);
            expect(screen.getByRole('button')).toHaveClass('custom-class');
        });

        it('renders leftIcon when provided', () => {
            render(
                <Button leftIcon={<span data-testid="left-icon">+</span>}>
                    Add
                </Button>,
            );
            expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        });

        it('renders rightIcon when provided', () => {
            render(
                <Button rightIcon={<span data-testid="right-icon">→</span>}>
                    Next
                </Button>,
            );
            expect(screen.getByTestId('right-icon')).toBeInTheDocument();
        });

        it('renders loading spinner when isLoading', () => {
            render(<Button isLoading>Save</Button>);
            const button = screen.getByRole('button');
            const spinner = button.querySelector('svg');
            expect(spinner).toBeInTheDocument();
            expect(spinner).toHaveAttribute('aria-hidden', 'true');
        });

        it('renders loadingText when isLoading and loadingText provided', () => {
            render(
                <Button isLoading loadingText="Saving...">
                    Save
                </Button>,
            );
            expect(screen.getByText('Saving...')).toBeInTheDocument();
            expect(screen.queryByText('Save')).not.toBeInTheDocument();
        });
    });

    describe('states', () => {
        it('applies disabled styles when isDisabled', () => {
            render(<Button isDisabled>Click me</Button>);
            expect(screen.getByRole('button')).toHaveClass('opacity-50');
        });

        it('applies loading styles when isLoading', () => {
            render(<Button isLoading>Click me</Button>);
            expect(screen.getByRole('button')).toHaveClass('opacity-80');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations for every variant', async () => {
            const variants = [
                'primary',
                'secondary',
                'destructive',
                'ghost',
                'outline',
            ] as const;

            for (const variant of variants) {
                const { container, unmount } = render(
                    <Button variant={variant}>{variant}</Button>,
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
                    <Button size={size}>{size}</Button>,
                );
                const results = await axe(container);
                expect(results).toHaveNoViolations();
                unmount();
            }
        });

        it('has no axe violations when disabled', async () => {
            const { container } = render(
                <Button isDisabled>Disabled</Button>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when loading', async () => {
            const { container } = render(
                <Button isLoading>Loading</Button>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
