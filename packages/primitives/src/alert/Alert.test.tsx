import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { AlertPrimitive, AlertTitlePrimitive, AlertDescriptionPrimitive } from './Alert';

expect.extend(toHaveNoViolations);

describe('AlertPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(
                <AlertPrimitive>
                    <AlertTitlePrimitive>Title</AlertTitlePrimitive>
                    <AlertDescriptionPrimitive>Description</AlertDescriptionPrimitive>
                </AlertPrimitive>,
            );
            expect(screen.getByRole('alert')).toBeInTheDocument();
            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
        });

        it('renders with variant', () => {
            render(<AlertPrimitive variant="destructive">Error!</AlertPrimitive>);
            expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'destructive');
        });
    });

    describe('dismiss', () => {
        it('renders dismiss button when isDismissible', () => {
            render(<AlertPrimitive isDismissible>Content</AlertPrimitive>);
            expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
        });

        it('does not render dismiss button by default', () => {
            render(<AlertPrimitive>Content</AlertPrimitive>);
            expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
        });

        it('dismisses on button click', async () => {
            const user = userEvent.setup();
            render(<AlertPrimitive isDismissible>Content</AlertPrimitive>);

            await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });

        it('calls onDismiss callback', async () => {
            const onDismiss = vi.fn();
            const user = userEvent.setup();
            render(<AlertPrimitive isDismissible onDismiss={onDismiss}>Content</AlertPrimitive>);

            await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
            expect(onDismiss).toHaveBeenCalledTimes(1);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <AlertPrimitive>
                    <AlertTitlePrimitive>Title</AlertTitlePrimitive>
                    <AlertDescriptionPrimitive>Description</AlertDescriptionPrimitive>
                </AlertPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has role="alert"', () => {
            render(<AlertPrimitive>Content</AlertPrimitive>);
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });
});
