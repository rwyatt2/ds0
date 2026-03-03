import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Heading } from './Heading';

expect.extend(toHaveNoViolations);

describe('Heading (Styled)', () => {
    describe('rendering', () => {
        it('renders with default level (h2) and applies size classes', () => {
            render(<Heading>Title</Heading>);
            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toBeInTheDocument();
            expect(heading).toHaveClass('text-3xl');
        });

        it('applies correct default size for each heading level', () => {
            const levels = [
                { as: 'h1' as const, expected: 'text-4xl' },
                { as: 'h2' as const, expected: 'text-3xl' },
                { as: 'h3' as const, expected: 'text-2xl' },
                { as: 'h4' as const, expected: 'text-xl' },
                { as: 'h5' as const, expected: 'text-lg' },
                { as: 'h6' as const, expected: 'text-base' },
            ];

            for (const { as, expected } of levels) {
                const { unmount } = render(
                    <Heading as={as}>{as}</Heading>,
                );
                expect(screen.getByRole('heading')).toHaveClass(expected);
                unmount();
            }
        });

        it('allows size override independent of heading level', () => {
            render(
                <Heading as="h3" size="4xl">
                    Title
                </Heading>,
            );
            expect(screen.getByRole('heading', { level: 3 })).toHaveClass(
                'text-4xl',
            );
        });

        it('applies weight classes', () => {
            render(<Heading weight="semibold">Title</Heading>);
            expect(screen.getByRole('heading')).toHaveClass('font-semibold');
        });

        it('applies tracking classes', () => {
            render(<Heading tracking="tighter">Title</Heading>);
            expect(screen.getByRole('heading')).toHaveClass(
                'tracking-tighter',
            );
        });

        it('merges custom className', () => {
            render(<Heading className="custom-class">Title</Heading>);
            expect(screen.getByRole('heading')).toHaveClass('custom-class');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations for each heading level', async () => {
            const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

            for (const as of levels) {
                const { container, unmount } = render(
                    <Heading as={as}>{as}</Heading>,
                );
                const results = await axe(container);
                expect(results).toHaveNoViolations();
                unmount();
            }
        });
    });
});
