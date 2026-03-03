import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { TextFieldPrimitive } from './TextField';

expect.extend(toHaveNoViolations);

describe('TextFieldPrimitive', () => {
    describe('rendering', () => {
        it('renders with a label and input', () => {
            render(<TextFieldPrimitive label="Email" />);
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        it('renders with default type of text', () => {
            render(<TextFieldPrimitive label="Name" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
        });

        it('renders with specified type', () => {
            render(<TextFieldPrimitive label="Email" type="email" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
        });

        it('renders helper text', () => {
            render(
                <TextFieldPrimitive
                    label="Email"
                    helperText="We'll never share your email"
                />,
            );
            expect(
                screen.getByText("We'll never share your email"),
            ).toBeInTheDocument();
        });

        it('renders error message when invalid', () => {
            render(
                <TextFieldPrimitive
                    label="Email"
                    isInvalid
                    errorMessage="Email is required"
                />,
            );
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByRole('alert')).toHaveTextContent(
                'Email is required',
            );
        });

        it('shows error message instead of helper text when invalid', () => {
            render(
                <TextFieldPrimitive
                    label="Email"
                    isInvalid
                    errorMessage="Email is required"
                    helperText="Enter your email"
                />,
            );
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(
                screen.queryByText('Enter your email'),
            ).not.toBeInTheDocument();
        });

        it('shows required indicator when isRequired', () => {
            render(<TextFieldPrimitive label="Email" isRequired />);
            expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('forwards ref to input element', () => {
            const ref = createRef<HTMLInputElement>();
            render(<TextFieldPrimitive ref={ref} label="Email" />);
            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });
    });

    describe('interactions', () => {
        it('accepts user input', async () => {
            const user = userEvent.setup();
            render(<TextFieldPrimitive label="Name" />);
            const input = screen.getByRole('textbox');
            await user.type(input, 'John Doe');
            expect(input).toHaveValue('John Doe');
        });

        it('calls onChange when typing', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<TextFieldPrimitive label="Name" onChange={onChange} />);
            await user.type(screen.getByRole('textbox'), 'a');
            expect(onChange).toHaveBeenCalled();
        });

        it('calls onBlur when focus leaves', async () => {
            const onBlur = vi.fn();
            const user = userEvent.setup();
            render(<TextFieldPrimitive label="Name" onBlur={onBlur} />);
            await user.click(screen.getByRole('textbox'));
            await user.tab();
            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<TextFieldPrimitive label="Name" />);
            await user.tab();
            expect(screen.getByRole('textbox')).toHaveFocus();
        });

        it('is not focusable when disabled', async () => {
            const user = userEvent.setup();
            render(<TextFieldPrimitive label="Name" isDisabled />);
            await user.tab();
            expect(screen.getByRole('textbox')).not.toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <TextFieldPrimitive label="Email" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when required', async () => {
            const { container } = render(
                <TextFieldPrimitive label="Email" isRequired />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when invalid with error', async () => {
            const { container } = render(
                <TextFieldPrimitive
                    label="Email"
                    isInvalid
                    errorMessage="Required"
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('sets aria-invalid when isInvalid', () => {
            render(<TextFieldPrimitive label="Email" isInvalid />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true',
            );
        });

        it('sets aria-required when isRequired', () => {
            render(<TextFieldPrimitive label="Email" isRequired />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-required',
                'true',
            );
        });

        it('sets aria-disabled when isDisabled', () => {
            render(<TextFieldPrimitive label="Email" isDisabled />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-disabled',
                'true',
            );
        });

        it('sets readOnly when isReadOnly', () => {
            render(<TextFieldPrimitive label="Email" isReadOnly />);
            expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
        });

        it('connects label to input via htmlFor', () => {
            render(<TextFieldPrimitive label="Email" />);
            const input = screen.getByRole('textbox');
            const label = screen.getByText('Email');
            expect(label).toHaveAttribute('for', input.id);
        });

        it('connects input to helper text via aria-describedby', () => {
            render(
                <TextFieldPrimitive
                    label="Email"
                    helperText="Enter your email"
                />,
            );
            const input = screen.getByRole('textbox');
            const helperText = screen.getByText('Enter your email');
            expect(input).toHaveAttribute('aria-describedby', helperText.id);
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to the input element', () => {
            const ref = vi.fn();
            render(<TextFieldPrimitive ref={ref} label="Email" />);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
        });
    });
});
