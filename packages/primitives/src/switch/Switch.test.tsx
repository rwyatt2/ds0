import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { SwitchPrimitive } from './Switch';

expect.extend(toHaveNoViolations);

describe('SwitchPrimitive', () => {
    describe('rendering', () => {
        it('renders with role="switch"', () => {
            render(<SwitchPrimitive label="Notifications" />);
            expect(screen.getByRole('switch')).toBeInTheDocument();
        });

        it('renders label', () => {
            render(<SwitchPrimitive label="Dark Mode" />);
            expect(screen.getByText('Dark Mode')).toBeInTheDocument();
        });

        it('forwards ref', () => {
            const ref = createRef<HTMLButtonElement>();
            render(<SwitchPrimitive ref={ref} label="Test" />);
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });
    });

    describe('interactions', () => {
        it('toggles on click', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<SwitchPrimitive label="Test" onCheckedChange={onChange} />);
            await user.click(screen.getByRole('switch'));
            expect(onChange).toHaveBeenCalledWith(true);
        });

        it('does not toggle when disabled', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<SwitchPrimitive label="Test" isDisabled onCheckedChange={onChange} />);
            await user.click(screen.getByRole('switch'));
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('toggles on Space', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<SwitchPrimitive label="Test" onCheckedChange={onChange} />);
            screen.getByRole('switch').focus();
            await user.keyboard(' ');
            expect(onChange).toHaveBeenCalledWith(true);
        });

        it('toggles on Enter', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<SwitchPrimitive label="Test" onCheckedChange={onChange} />);
            screen.getByRole('switch').focus();
            await user.keyboard('{Enter}');
            expect(onChange).toHaveBeenCalledWith(true);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<SwitchPrimitive label="Dark Mode" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has aria-checked reflecting state', () => {
            render(<SwitchPrimitive label="Test" defaultChecked />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
        });

        it('has aria-disabled when disabled', () => {
            render(<SwitchPrimitive label="Test" isDisabled />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
        });
    });
});
