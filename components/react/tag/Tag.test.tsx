import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tag } from './Tag';

expect.extend(toHaveNoViolations);

describe('Tag (Styled)', () => {
    describe('rendering', () => {
        it('renders with default variant', () => {
            render(<Tag>Default</Tag>);
            expect(screen.getByText('Default')).toHaveClass('bg-secondary');
        });

        it('applies each variant class', () => {
            const variants = [
                { variant: 'primary' as const, expected: 'bg-primary' },
                { variant: 'destructive' as const, expected: 'bg-destructive' },
                { variant: 'outline' as const, expected: 'border' },
            ];
            for (const { variant, expected } of variants) {
                const { unmount } = render(<Tag variant={variant}>{variant}</Tag>);
                expect(screen.getByText(variant)).toHaveClass(expected);
                unmount();
            }
        });

        it('applies each size class', () => {
            const sizes = [
                { size: 'sm' as const, expected: 'h-6' },
                { size: 'md' as const, expected: 'h-7' },
                { size: 'lg' as const, expected: 'h-8' },
            ];
            for (const { size, expected } of sizes) {
                const { unmount } = render(<Tag size={size}>{size}</Tag>);
                expect(screen.getByText(size)).toHaveClass(expected);
                unmount();
            }
        });

        it('renders remove button when removable', () => {
            render(<Tag isRemovable onRemove={() => {}}>Tag</Tag>);
            expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Tag>Tag</Tag>);
            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations (removable)', async () => {
            const { container } = render(<Tag isRemovable onRemove={() => {}}>Tag</Tag>);
            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
