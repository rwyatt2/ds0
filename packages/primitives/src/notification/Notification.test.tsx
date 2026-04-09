import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NotificationPrimitive } from './Notification';

expect.extend(toHaveNoViolations);

describe('NotificationPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<NotificationPrimitive>Test</NotificationPrimitive>);
            expect(screen.getByRole('status')).toBeInTheDocument();
        });

        it('renders title when provided', () => {
            render(<NotificationPrimitive title="Title">Body</NotificationPrimitive>);
            expect(screen.getByText('Title')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('dismisses on button click', async () => {
            const onDismiss = vi.fn();
            const user = userEvent.setup();
            render(<NotificationPrimitive isDismissible onDismiss={onDismiss}>Test</NotificationPrimitive>);
            await user.click(screen.getByLabelText('Dismiss notification'));
            expect(onDismiss).toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('dismisses on Escape', async () => {
            const onDismiss = vi.fn();
            const user = userEvent.setup();
            render(<NotificationPrimitive isDismissible onDismiss={onDismiss}>Test</NotificationPrimitive>);
            screen.getByRole('status').focus();
            await user.keyboard('{Escape}');
            expect(onDismiss).toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<NotificationPrimitive>Test</NotificationPrimitive>);
            expect(await axe(container)).toHaveNoViolations();
        });

        it('uses role="alert" for error variant', () => {
            render(<NotificationPrimitive variant="error">Test</NotificationPrimitive>);
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref', () => {
            const ref = vi.fn();
            render(<NotificationPrimitive ref={ref}>Test</NotificationPrimitive>);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
