import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { ButtonPrimitive } from './Button';

expect.extend(toHaveNoViolations);

describe('ButtonPrimitive', () => {
    describe('rendering', () => {
        it('renders as a <button> element', () => {
            render(<ButtonPrimitive>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
        });

        it('renders children', () => {
            render(<ButtonPrimitive>Save Changes</ButtonPrimitive>);
            expect(screen.getByText('Save Changes')).toBeInTheDocument();
        });

        it('defaults type to "button"', () => {
            render(<ButtonPrimitive>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
        });

        it('can set type to "submit"', () => {
            render(<ButtonPrimitive type="submit">Submit</ButtonPrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
        });

        it('forwards ref to the button element', () => {
            const ref = createRef<HTMLButtonElement>();
            render(<ButtonPrimitive ref={ref}>Click me</ButtonPrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });

        it('spreads additional props onto the button', () => {
            render(
                <ButtonPrimitive data-testid="custom" aria-label="custom label">
                    Click me
                </ButtonPrimitive>,
            );
            expect(screen.getByTestId('custom')).toBeInTheDocument();
            expect(screen.getByRole('button')).toHaveAttribute(
                'aria-label',
                'custom label',
            );
        });
    });

    describe('interactions', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(<ButtonPrimitive onClick={onClick}>Click me</ButtonPrimitive>);
            await user.click(screen.getByRole('button'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('does not call onClick when isDisabled is true', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(
                <ButtonPrimitive isDisabled onClick={onClick}>
                    Click me
                </ButtonPrimitive>,
            );
            await user.click(screen.getByRole('button'));
            expect(onClick).not.toHaveBeenCalled();
        });

        it('does not call onClick when isLoading is true', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(
                <ButtonPrimitive isLoading onClick={onClick}>
                    Click me
                </ButtonPrimitive>,
            );
            await user.click(screen.getByRole('button'));
            expect(onClick).not.toHaveBeenCalled();
        });

        it('calls onClick on Enter key', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(<ButtonPrimitive onClick={onClick}>Click me</ButtonPrimitive>);
            screen.getByRole('button').focus();
            await user.keyboard('{Enter}');
            expect(onClick).toHaveBeenCalled();
        });

        it('calls onClick on Space key (keyup)', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(<ButtonPrimitive onClick={onClick}>Click me</ButtonPrimitive>);
            screen.getByRole('button').focus();
            await user.keyboard(' ');
            expect(onClick).toHaveBeenCalled();
        });

        it('does not fire onClick on Space keydown (only keyup)', async () => {
            const onClick = vi.fn();
            render(<ButtonPrimitive onClick={onClick}>Click me</ButtonPrimitive>);
            const button = screen.getByRole('button');
            button.focus();

            // Simulate only keydown without keyup
            const keydownEvent = new KeyboardEvent('keydown', {
                key: ' ',
                bubbles: true,
            });
            button.dispatchEvent(keydownEvent);

            // The click should not have fired from keydown alone
            // (native button fires click on keyup for space)
            // We verify by checking the onClick wasn't called before keyup
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations (default)', async () => {
            const { container } = render(
                <ButtonPrimitive>Click me</ButtonPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (disabled)', async () => {
            const { container } = render(
                <ButtonPrimitive isDisabled>Click me</ButtonPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('sets aria-disabled="true" when isDisabled', () => {
            render(<ButtonPrimitive isDisabled>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute(
                'aria-disabled',
                'true',
            );
        });

        it('sets aria-busy="true" when isLoading', () => {
            render(<ButtonPrimitive isLoading>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute(
                'aria-busy',
                'true',
            );
        });

        it('does NOT use the HTML disabled attribute', () => {
            render(<ButtonPrimitive isDisabled>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).not.toBeDisabled();
        });

        it('has tabIndex 0 by default', () => {
            render(<ButtonPrimitive>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
        });

        it('has tabIndex -1 when disabled', () => {
            render(<ButtonPrimitive isDisabled>Click me</ButtonPrimitive>);
            expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
        });

        it('is focusable when not disabled', async () => {
            const user = userEvent.setup();
            render(<ButtonPrimitive>Click me</ButtonPrimitive>);
            await user.tab();
            expect(screen.getByRole('button')).toHaveFocus();
        });

        it('is not focusable when disabled', async () => {
            const user = userEvent.setup();
            render(<ButtonPrimitive isDisabled>Click me</ButtonPrimitive>);
            await user.tab();
            expect(screen.getByRole('button')).not.toHaveFocus();
        });
    });
});
