import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { LabelPrimitive } from './Label';

expect.extend(toHaveNoViolations);

describe('LabelPrimitive', () => {
    describe('rendering', () => {
        it('renders as a <label> element', () => {
            render(<LabelPrimitive htmlFor="test">Email</LabelPrimitive>);
            expect(screen.getByText('Email').tagName).toBe('LABEL');
        });

        it('renders children', () => {
            render(<LabelPrimitive htmlFor="test">Username</LabelPrimitive>);
            expect(screen.getByText('Username')).toBeInTheDocument();
        });

        it('sets htmlFor attribute', () => {
            render(<LabelPrimitive htmlFor="email-input">Email</LabelPrimitive>);
            expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input');
        });

        it('shows required indicator when required', () => {
            render(<LabelPrimitive htmlFor="test" required>Email</LabelPrimitive>);
            expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('includes screen-reader text for required', () => {
            render(<LabelPrimitive htmlFor="test" required>Email</LabelPrimitive>);
            expect(screen.getByText('required')).toBeInTheDocument();
        });

        it('forwards ref', () => {
            const ref = createRef<HTMLLabelElement>();
            render(<LabelPrimitive ref={ref} htmlFor="test">Email</LabelPrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLLabelElement);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <>
                    <LabelPrimitive htmlFor="email">Email</LabelPrimitive>
                    <input id="email" type="email" />
                </>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when required', async () => {
            const { container } = render(
                <>
                    <LabelPrimitive htmlFor="email" required>Email</LabelPrimitive>
                    <input id="email" type="email" required />
                </>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
