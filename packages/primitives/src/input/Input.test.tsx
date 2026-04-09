import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { InputPrimitive } from './Input';

expect.extend(toHaveNoViolations);

describe('InputPrimitive', () => {
    describe('rendering', () => {
        it('renders as an <input> element', () => {
            render(<InputPrimitive aria-label="test input" />);
            expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLInputElement);
        });

        it('renders with placeholder', () => {
            render(<InputPrimitive placeholder="Search..." aria-label="search" />);
            expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
        });

        it('defaults type to "text"', () => {
            render(<InputPrimitive aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
        });

        it('can set type to "email"', () => {
            render(<InputPrimitive type="email" aria-label="email" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
        });

        it('forwards ref to the input element', () => {
            const ref = createRef<HTMLInputElement>();
            render(<InputPrimitive ref={ref} aria-label="test" />);
            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });

        it('spreads additional props onto the input', () => {
            render(
                <InputPrimitive data-testid="custom" aria-label="custom label" />,
            );
            expect(screen.getByTestId('custom')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onChange when value changes', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<InputPrimitive onChange={onChange} aria-label="test" />);
            await user.type(screen.getByRole('textbox'), 'hello');
            expect(onChange).toHaveBeenCalledTimes(5);
        });

        it('does not call onChange when isDisabled', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<InputPrimitive isDisabled onChange={onChange} aria-label="test" />);
            await user.type(screen.getByRole('textbox'), 'hello');
            expect(onChange).not.toHaveBeenCalled();
        });

        it('does not call onChange when isReadOnly', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<InputPrimitive isReadOnly onChange={onChange} aria-label="test" />);
            await user.type(screen.getByRole('textbox'), 'hello');
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<InputPrimitive aria-label="test" />);
            await user.tab();
            expect(screen.getByRole('textbox')).toHaveFocus();
        });

        it('is not focusable when disabled', async () => {
            const user = userEvent.setup();
            render(<InputPrimitive isDisabled aria-label="test" />);
            await user.tab();
            expect(screen.getByRole('textbox')).not.toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations (default)', async () => {
            const { container } = render(
                <InputPrimitive aria-label="test input" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (disabled)', async () => {
            const { container } = render(
                <InputPrimitive isDisabled aria-label="test input" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (invalid)', async () => {
            const { container } = render(
                <InputPrimitive isInvalid aria-label="test input" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('sets aria-disabled when disabled', () => {
            render(<InputPrimitive isDisabled aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-disabled',
                'true',
            );
        });

        it('sets aria-readonly when read-only', () => {
            render(<InputPrimitive isReadOnly aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-readonly',
                'true',
            );
        });

        it('sets aria-invalid when invalid', () => {
            render(<InputPrimitive isInvalid aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true',
            );
        });

        it('has tabIndex 0 by default', () => {
            render(<InputPrimitive aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('tabindex', '0');
        });

        it('has tabIndex -1 when disabled', () => {
            render(<InputPrimitive isDisabled aria-label="test" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('tabindex', '-1');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<InputPrimitive ref={ref} aria-label="test" />);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
        });
    });
});
