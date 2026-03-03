import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { TogglePrimitive } from './Toggle';

expect.extend(toHaveNoViolations);

describe('TogglePrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<TogglePrimitive>Bold</TogglePrimitive>);
            expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
        });

        it('renders children', () => {
            render(<TogglePrimitive>Toggle Me</TogglePrimitive>);
            expect(screen.getByText('Toggle Me')).toBeInTheDocument();
        });

        it('has data-state="off" by default', () => {
            render(<TogglePrimitive>Bold</TogglePrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');
        });

        it('has data-state="on" when defaultPressed is true', () => {
            render(<TogglePrimitive defaultPressed>Bold</TogglePrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
        });
    });

    describe('interactions', () => {
        it('toggles pressed state on click', async () => {
            const user = userEvent.setup();
            render(<TogglePrimitive>Bold</TogglePrimitive>);
            const button = screen.getByRole('button');

            expect(button).toHaveAttribute('aria-pressed', 'false');
            await user.click(button);
            expect(button).toHaveAttribute('aria-pressed', 'true');
            await user.click(button);
            expect(button).toHaveAttribute('aria-pressed', 'false');
        });

        it('calls onPressedChange when toggled', async () => {
            const onPressedChange = vi.fn();
            const user = userEvent.setup();
            render(<TogglePrimitive onPressedChange={onPressedChange}>Bold</TogglePrimitive>);

            await user.click(screen.getByRole('button'));
            expect(onPressedChange).toHaveBeenCalledWith(true);
        });

        it('does not toggle when disabled', async () => {
            const onPressedChange = vi.fn();
            const user = userEvent.setup();
            render(<TogglePrimitive isDisabled onPressedChange={onPressedChange}>Bold</TogglePrimitive>);

            await user.click(screen.getByRole('button'));
            expect(onPressedChange).not.toHaveBeenCalled();
            expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
        });

        it('supports controlled pressed state', async () => {
            const onPressedChange = vi.fn();
            const user = userEvent.setup();
            const { rerender } = render(
                <TogglePrimitive pressed={false} onPressedChange={onPressedChange}>Bold</TogglePrimitive>,
            );

            await user.click(screen.getByRole('button'));
            expect(onPressedChange).toHaveBeenCalledWith(true);
            // Stays false because it's controlled
            expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');

            rerender(<TogglePrimitive pressed={true} onPressedChange={onPressedChange}>Bold</TogglePrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
        });
    });

    describe('keyboard', () => {
        it('is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<TogglePrimitive>Bold</TogglePrimitive>);
            await user.tab();
            expect(screen.getByRole('button')).toHaveFocus();
        });

        it('is not focusable when disabled', async () => {
            const user = userEvent.setup();
            render(<TogglePrimitive isDisabled>Bold</TogglePrimitive>);
            await user.tab();
            expect(screen.getByRole('button')).not.toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<TogglePrimitive>Bold</TogglePrimitive>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has aria-pressed attribute', () => {
            render(<TogglePrimitive>Bold</TogglePrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
        });

        it('has aria-disabled when disabled', () => {
            render(<TogglePrimitive isDisabled>Bold</TogglePrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<TogglePrimitive ref={ref}>Bold</TogglePrimitive>);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
