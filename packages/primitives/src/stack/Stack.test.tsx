import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { StackPrimitive } from './Stack';

expect.extend(toHaveNoViolations);

describe('StackPrimitive', () => {
    it('renders as div by default', () => {
        render(<StackPrimitive data-testid="stack">content</StackPrimitive>);
        expect(screen.getByTestId('stack').tagName).toBe('DIV');
    });
    it('renders custom element via as prop', () => {
        render(<StackPrimitive as="nav" data-testid="stack">content</StackPrimitive>);
        expect(screen.getByTestId('stack').tagName).toBe('NAV');
    });
    it('renders children', () => {
        render(<StackPrimitive>Hello</StackPrimitive>);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
    it('forwards ref', () => {
        const ref = createRef<HTMLElement>();
        render(<StackPrimitive ref={ref}>content</StackPrimitive>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });
    it('has no axe violations', async () => {
        const { container } = render(<StackPrimitive>content</StackPrimitive>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
