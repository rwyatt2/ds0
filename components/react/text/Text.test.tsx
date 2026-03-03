import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Text } from './Text';

expect.extend(toHaveNoViolations);

describe('Text (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Text>Content</Text>);
            expect(screen.getByText('Content')).toBeInTheDocument();
            expect(screen.getByText('Content').tagName).toBe('P');
        });

        it('applies size classes', () => {
            const sizes = [
                { size: 'xs' as const, expected: 'text-xs' },
                { size: 'sm' as const, expected: 'text-sm' },
                { size: 'base' as const, expected: 'text-base' },
                { size: 'lg' as const, expected: 'text-lg' },
                { size: 'xl' as const, expected: 'text-xl' },
            ];

            for (const { size, expected } of sizes) {
                const { unmount } = render(<Text size={size}>{size}</Text>);
                expect(screen.getByText(size)).toHaveClass(expected);
                unmount();
            }
        });

        it('applies weight classes', () => {
            render(<Text weight="bold">Bold</Text>);
            expect(screen.getByText('Bold')).toHaveClass('font-bold');
        });

        it('applies color classes', () => {
            render(<Text color="muted">Muted</Text>);
            expect(screen.getByText('Muted')).toHaveClass(
                'text-muted-foreground',
            );
        });

        it('applies align classes', () => {
            render(<Text align="center">Centered</Text>);
            expect(screen.getByText('Centered')).toHaveClass('text-center');
        });

        it('renders correct element for each as value', () => {
            const elements = [
                { as: 'span' as const, tag: 'SPAN' },
                { as: 'div' as const, tag: 'DIV' },
                { as: 'em' as const, tag: 'EM' },
                { as: 'strong' as const, tag: 'STRONG' },
            ];

            for (const { as, tag } of elements) {
                const { unmount } = render(<Text as={as}>{tag}</Text>);
                expect(screen.getByText(tag).tagName).toBe(tag);
                unmount();
            }
        });

        it('merges custom className', () => {
            render(<Text className="custom-class">Content</Text>);
            expect(screen.getByText('Content')).toHaveClass('custom-class');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Text>Content</Text>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
