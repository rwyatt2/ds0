import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { TextField } from './TextField';

expect.extend(toHaveNoViolations);

describe('TextField (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<TextField label="Name" />);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
        });

        it('applies size classes', () => {
            const sizes = [
                { size: 'sm' as const, expected: 'h-8' },
                { size: 'md' as const, expected: 'h-10' },
                { size: 'lg' as const, expected: 'h-12' },
            ];

            for (const { size, expected } of sizes) {
                const { unmount } = render(
                    <TextField label="Name" size={size} />,
                );
                expect(screen.getByRole('textbox')).toHaveClass(expected);
                unmount();
            }
        });

        it('merges custom className on wrapper', () => {
            const { container } = render(
                <TextField label="Name" className="custom-class" />,
            );
            expect(container.firstChild).toHaveClass('custom-class');
        });

        it('renders left icon', () => {
            render(
                <TextField
                    label="Search"
                    leftIcon={<span data-testid="left-icon">🔍</span>}
                />,
            );
            expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        });

        it('renders right icon', () => {
            render(
                <TextField
                    label="Search"
                    rightIcon={<span data-testid="right-icon">✕</span>}
                />,
            );
            expect(screen.getByTestId('right-icon')).toBeInTheDocument();
        });

        it('applies invalid state classes', () => {
            render(
                <TextField
                    label="Email"
                    isInvalid
                    errorMessage="Required"
                />,
            );
            expect(screen.getByRole('textbox')).toHaveClass(
                'border-destructive',
            );
        });

        it('applies disabled state classes', () => {
            render(<TextField label="Name" isDisabled />);
            expect(screen.getByRole('textbox')).toHaveClass('opacity-50');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<TextField label="Name" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when required', async () => {
            const { container } = render(
                <TextField label="Email" isRequired />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when invalid', async () => {
            const { container } = render(
                <TextField
                    label="Email"
                    isInvalid
                    errorMessage="Email is required"
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
