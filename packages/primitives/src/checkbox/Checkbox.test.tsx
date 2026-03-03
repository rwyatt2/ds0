import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { CheckboxPrimitive } from './Checkbox';

expect.extend(toHaveNoViolations);

describe('CheckboxPrimitive', () => {
    describe('rendering', () => {
        it('renders with a label and checkbox', () => {
            render(<CheckboxPrimitive label="Accept terms" />);
            expect(screen.getByRole('checkbox')).toBeInTheDocument();
            expect(screen.getByText('Accept terms')).toBeInTheDocument();
        });

        it('renders description text', () => {
            render(
                <CheckboxPrimitive
                    label="Remember me"
                    description="Stay signed in on this device"
                />,
            );
            expect(screen.getByText('Stay signed in on this device')).toBeInTheDocument();
        });

        it('forwards ref to input element', () => {
            const ref = createRef<HTMLInputElement>();
            render(<CheckboxPrimitive ref={ref} label="Test" />);
            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });
    });

    describe('interactions', () => {
        it('toggles on click', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<CheckboxPrimitive label="Test" onCheckedChange={onChange} />);
            await user.click(screen.getByRole('checkbox'));
            expect(onChange).toHaveBeenCalledWith(true);
        });

        it('does not toggle when disabled', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<CheckboxPrimitive label="Test" isDisabled onCheckedChange={onChange} />);
            await user.click(screen.getByRole('checkbox'));
            expect(onChange).not.toHaveBeenCalled();
        });

        it('supports controlled checked state', () => {
            render(<CheckboxPrimitive label="Test" checked={true} />);
            expect(screen.getByRole('checkbox')).toBeChecked();
        });

        it('supports uncontrolled default checked', () => {
            render(<CheckboxPrimitive label="Test" defaultChecked={true} />);
            expect(screen.getByRole('checkbox')).toBeChecked();
        });
    });

    describe('keyboard', () => {
        it('toggles on Space key', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<CheckboxPrimitive label="Test" onCheckedChange={onChange} />);
            screen.getByRole('checkbox').focus();
            await user.keyboard(' ');
            expect(onChange).toHaveBeenCalledWith(true);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<CheckboxPrimitive label="Accept" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('sets aria-disabled when disabled', () => {
            render(<CheckboxPrimitive label="Test" isDisabled />);
            expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
        });

        it('sets aria-required when required', () => {
            render(<CheckboxPrimitive label="Test" isRequired />);
            expect(screen.getByRole('checkbox')).toHaveAttribute('aria-required', 'true');
        });

        it('sets aria-invalid when invalid', () => {
            render(<CheckboxPrimitive label="Test" isInvalid />);
            expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
        });

        it('sets aria-checked to mixed when indeterminate', () => {
            render(<CheckboxPrimitive label="Test" indeterminate />);
            expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
        });

        it('connects label to checkbox', () => {
            render(<CheckboxPrimitive label="Accept" />);
            const checkbox = screen.getByRole('checkbox');
            expect(screen.getByLabelText('Accept')).toBe(checkbox);
        });
    });
});
