import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { DialogPrimitive } from './Dialog';
import { DialogTriggerPrimitive } from './DialogTrigger';
import { DialogPortalPrimitive } from './DialogPortal';
import { DialogOverlayPrimitive } from './DialogOverlay';
import { DialogContentPrimitive } from './DialogContent';
import { DialogTitlePrimitive } from './DialogTitle';
import { DialogDescriptionPrimitive } from './DialogDescription';
import { DialogClosePrimitive } from './DialogClose';

expect.extend(toHaveNoViolations);

function renderDialog(props = {}) {
    return render(
        <DialogPrimitive {...props}>
            <DialogTriggerPrimitive>Open Dialog</DialogTriggerPrimitive>
            <DialogPortalPrimitive>
                <DialogOverlayPrimitive data-testid="overlay" />
                <DialogContentPrimitive data-testid="content">
                    <DialogTitlePrimitive>Dialog Title</DialogTitlePrimitive>
                    <DialogDescriptionPrimitive>Dialog Description</DialogDescriptionPrimitive>
                    <DialogClosePrimitive>Close</DialogClosePrimitive>
                </DialogContentPrimitive>
            </DialogPortalPrimitive>
        </DialogPrimitive>,
    );
}

describe('DialogPrimitive', () => {
    describe('rendering', () => {
        it('renders trigger button', () => {
            renderDialog();
            expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument();
        });

        it('does not render content when closed', () => {
            renderDialog();
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('renders content when defaultOpen is true', () => {
            renderDialog({ defaultOpen: true });
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('opens on trigger click', async () => {
            const user = userEvent.setup();
            renderDialog();

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        it('closes on close button click', async () => {
            const user = userEvent.setup();
            renderDialog({ defaultOpen: true });

            await user.click(screen.getByRole('button', { name: 'Close' }));
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            });
        });

        it('closes on overlay click', async () => {
            const user = userEvent.setup();
            renderDialog({ defaultOpen: true });

            await user.click(screen.getByTestId('overlay'));
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            });
        });

        it('closes on Escape key', async () => {
            const user = userEvent.setup();
            renderDialog({ defaultOpen: true });

            await user.keyboard('{Escape}');
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            });
        });

        it('calls onOpenChange', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();
            renderDialog({ onOpenChange });

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            expect(onOpenChange).toHaveBeenCalledWith(true);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations when open', async () => {
            const { container } = renderDialog({ defaultOpen: true });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has dialog role on content', () => {
            renderDialog({ defaultOpen: true });
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
        });

        it('has aria-labelledby pointing to title', () => {
            renderDialog({ defaultOpen: true });
            const dialog = screen.getByRole('dialog');
            const titleId = dialog.getAttribute('aria-labelledby');
            expect(titleId).toBeTruthy();
            expect(screen.getByText('Dialog Title')).toHaveAttribute('id', titleId);
        });

        it('has aria-describedby pointing to description', () => {
            renderDialog({ defaultOpen: true });
            const dialog = screen.getByRole('dialog');
            const descId = dialog.getAttribute('aria-describedby');
            expect(descId).toBeTruthy();
            expect(screen.getByText('Dialog Description')).toHaveAttribute('id', descId);
        });

        it('trigger has aria-haspopup', () => {
            renderDialog();
            expect(screen.getByRole('button', { name: 'Open Dialog' })).toHaveAttribute(
                'aria-haspopup',
                'dialog',
            );
        });
    });
});
