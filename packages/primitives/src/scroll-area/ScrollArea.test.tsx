import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { ScrollAreaPrimitive } from './ScrollArea';

expect.extend(toHaveNoViolations);

describe('ScrollAreaPrimitive', () => {
    describe('rendering', () => {
        it('renders children', () => {
            render(<ScrollAreaPrimitive><p>Content</p></ScrollAreaPrimitive>);
            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('creates a scrollable container', () => {
            const { container } = render(<ScrollAreaPrimitive><p>Content</p></ScrollAreaPrimitive>);
            const root = container.firstChild as HTMLElement;
            expect(root.style.overflow).toBe('hidden');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<ScrollAreaPrimitive><p>Content</p></ScrollAreaPrimitive>);
            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref', () => {
            const ref = createRef<HTMLDivElement>();
            render(<ScrollAreaPrimitive ref={ref}>Content</ScrollAreaPrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });
    });
});
