import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    CardPrimitive,
    CardHeaderPrimitive,
    CardTitlePrimitive,
    CardDescriptionPrimitive,
    CardContentPrimitive,
    CardFooterPrimitive,
} from './Card';

expect.extend(toHaveNoViolations);

describe('CardPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<CardPrimitive>Card content</CardPrimitive>);
            expect(screen.getByText('Card content')).toBeInTheDocument();
        });

        it('renders all sub-components', () => {
            render(
                <CardPrimitive>
                    <CardHeaderPrimitive>
                        <CardTitlePrimitive>Title</CardTitlePrimitive>
                        <CardDescriptionPrimitive>Description</CardDescriptionPrimitive>
                    </CardHeaderPrimitive>
                    <CardContentPrimitive>Body</CardContentPrimitive>
                    <CardFooterPrimitive>Footer</CardFooterPrimitive>
                </CardPrimitive>,
            );
            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
            expect(screen.getByText('Body')).toBeInTheDocument();
            expect(screen.getByText('Footer')).toBeInTheDocument();
        });

        it('renders title as h3 by default', () => {
            render(<CardTitlePrimitive>Title</CardTitlePrimitive>);
            expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
        });

        it('renders title with custom element', () => {
            render(<CardTitlePrimitive as="h2">Title</CardTitlePrimitive>);
            expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <CardPrimitive>
                    <CardHeaderPrimitive>
                        <CardTitlePrimitive>Title</CardTitlePrimitive>
                    </CardHeaderPrimitive>
                    <CardContentPrimitive>Body</CardContentPrimitive>
                </CardPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<CardPrimitive ref={ref}>Content</CardPrimitive>);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
