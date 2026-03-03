import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { CodePrimitive } from './Code';

expect.extend(toHaveNoViolations);

describe('CodePrimitive', () => {
    describe('rendering', () => {
        it('renders inline <code> by default', () => {
            render(<CodePrimitive>const x = 1</CodePrimitive>);
            expect(screen.getByText('const x = 1').tagName).toBe('CODE');
        });

        it('renders block <pre><code> when variant="block"', () => {
            render(<CodePrimitive variant="block">const x = 1</CodePrimitive>);
            const code = screen.getByText('const x = 1');
            expect(code.tagName).toBe('CODE');
            expect(code.parentElement?.tagName).toBe('PRE');
        });

        it('renders children', () => {
            render(<CodePrimitive>npm install ds0</CodePrimitive>);
            expect(screen.getByText('npm install ds0')).toBeInTheDocument();
        });

        it('forwards ref for inline', () => {
            const ref = createRef<HTMLElement>();
            render(<CodePrimitive ref={ref}>code</CodePrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLElement);
        });

        it('forwards ref for block', () => {
            const ref = createRef<HTMLElement>();
            render(<CodePrimitive ref={ref} variant="block">code</CodePrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLPreElement);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations (inline)', async () => {
            const { container } = render(<CodePrimitive>code</CodePrimitive>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (block)', async () => {
            const { container } = render(<CodePrimitive variant="block">code</CodePrimitive>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
