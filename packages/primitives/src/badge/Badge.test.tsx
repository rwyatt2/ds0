import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { BadgePrimitive } from './Badge';

expect.extend(toHaveNoViolations);

describe('BadgePrimitive', () => {
    it('renders as a span', () => {
        render(<BadgePrimitive>New</BadgePrimitive>);
        expect(screen.getByText('New').tagName).toBe('SPAN');
    });
    it('renders children', () => {
        render(<BadgePrimitive>Active</BadgePrimitive>);
        expect(screen.getByText('Active')).toBeInTheDocument();
    });
    it('forwards ref', () => {
        const ref = createRef<HTMLSpanElement>();
        render(<BadgePrimitive ref={ref}>Test</BadgePrimitive>);
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
    it('has no axe violations', async () => {
        const { container } = render(<BadgePrimitive>Badge</BadgePrimitive>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
