import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { TextAreaPrimitive } from './TextArea';

expect.extend(toHaveNoViolations);

describe('TextAreaPrimitive', () => {
    describe('rendering', () => {
        it('renders with a label and textarea', () => {
            render(<TextAreaPrimitive label="Description" />);
            expect(screen.getByLabelText('Description')).toBeInTheDocument();
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        it('renders helper text', () => {
            render(
                <TextAreaPrimitive
                    label="Bio"
                    helperText="Tell us about yourself"
                />,
            );
            expect(
                screen.getByText('Tell us about yourself'),
            ).toBeInTheDocument();
        });

        it('renders error message when invalid', () => {
            render(
                <TextAreaPrimitive
                    label="Bio"
                    isInvalid
                    errorMessage="Bio is required"
                />,
            );
            expect(screen.getByText('Bio is required')).toBeInTheDocument();
            expect(screen.getByRole('alert')).toHaveTextContent(
                'Bio is required',
            );
        });

        it('shows required indicator when isRequired', () => {
            render(<TextAreaPrimitive label="Bio" isRequired />);
            expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('forwards ref to textarea element', () => {
            const ref = createRef<HTMLTextAreaElement>();
            render(<TextAreaPrimitive ref={ref} label="Bio" />);
            expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
        });
    });

    describe('interactions', () => {
        it('accepts user input', async () => {
            const user = userEvent.setup();
            render(<TextAreaPrimitive label="Description" />);
            const textarea = screen.getByRole('textbox');
            await user.type(textarea, 'Hello world');
            expect(textarea).toHaveValue('Hello world');
        });

        it('calls onChange when typing', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(
                <TextAreaPrimitive label="Description" onChange={onChange} />,
            );
            await user.type(screen.getByRole('textbox'), 'a');
            expect(onChange).toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<TextAreaPrimitive label="Description" />);
            await user.tab();
            expect(screen.getByRole('textbox')).toHaveFocus();
        });

        it('is not focusable when disabled', async () => {
            const user = userEvent.setup();
            render(<TextAreaPrimitive label="Description" isDisabled />);
            await user.tab();
            expect(screen.getByRole('textbox')).not.toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <TextAreaPrimitive label="Description" />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('sets aria-invalid when isInvalid', () => {
            render(<TextAreaPrimitive label="Bio" isInvalid />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true',
            );
        });

        it('sets aria-required when isRequired', () => {
            render(<TextAreaPrimitive label="Bio" isRequired />);
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-required',
                'true',
            );
        });

        it('sets readOnly when isReadOnly', () => {
            render(<TextAreaPrimitive label="Bio" isReadOnly />);
            expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to the textarea element', () => {
            const ref = vi.fn();
            render(<TextAreaPrimitive ref={ref} label="Bio" />);
            expect(ref).toHaveBeenCalledWith(
                expect.any(HTMLTextAreaElement),
            );
        });
    });
});
