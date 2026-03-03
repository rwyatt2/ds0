import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { HeadingPrimitive } from './Heading';

expect.extend(toHaveNoViolations);

describe('HeadingPrimitive', () => {
    describe('rendering', () => {
        it('renders as an <h2> element by default', () => {
            render(<HeadingPrimitive>Title</HeadingPrimitive>);
            expect(
                screen.getByRole('heading', { level: 2 }),
            ).toBeInTheDocument();
        });

        it('renders children', () => {
            render(<HeadingPrimitive>Page Title</HeadingPrimitive>);
            expect(screen.getByText('Page Title')).toBeInTheDocument();
        });

        it('renders as h1 when as="h1"', () => {
            render(<HeadingPrimitive as="h1">Title</HeadingPrimitive>);
            expect(
                screen.getByRole('heading', { level: 1 }),
            ).toBeInTheDocument();
        });

        it('renders as h3 when as="h3"', () => {
            render(<HeadingPrimitive as="h3">Title</HeadingPrimitive>);
            expect(
                screen.getByRole('heading', { level: 3 }),
            ).toBeInTheDocument();
        });

        it('renders as h4 when as="h4"', () => {
            render(<HeadingPrimitive as="h4">Title</HeadingPrimitive>);
            expect(
                screen.getByRole('heading', { level: 4 }),
            ).toBeInTheDocument();
        });

        it('renders as h5 when as="h5"', () => {
            render(<HeadingPrimitive as="h5">Title</HeadingPrimitive>);
            expect(
                screen.getByRole('heading', { level: 5 }),
            ).toBeInTheDocument();
        });

        it('renders as h6 when as="h6"', () => {
            render(<HeadingPrimitive as="h6">Title</HeadingPrimitive>);
            expect(
                screen.getByRole('heading', { level: 6 }),
            ).toBeInTheDocument();
        });

        it('forwards ref to the heading element', () => {
            const ref = createRef<HTMLHeadingElement>();
            render(<HeadingPrimitive ref={ref}>Title</HeadingPrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
        });

        it('spreads additional props onto the heading', () => {
            render(
                <HeadingPrimitive data-testid="custom" id="my-heading">
                    Title
                </HeadingPrimitive>,
            );
            expect(screen.getByTestId('custom')).toBeInTheDocument();
            expect(screen.getByRole('heading')).toHaveAttribute(
                'id',
                'my-heading',
            );
        });
    });

    describe('accessibility', () => {
        it('has no axe violations (default h2)', async () => {
            const { container } = render(
                <HeadingPrimitive>Title</HeadingPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (h1)', async () => {
            const { container } = render(
                <HeadingPrimitive as="h1">Title</HeadingPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has correct heading role', () => {
            render(<HeadingPrimitive>Title</HeadingPrimitive>);
            expect(screen.getByRole('heading')).toBeInTheDocument();
        });
    });
});
