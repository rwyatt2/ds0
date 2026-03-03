import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { DrawerPrimitive, DrawerTriggerPrimitive, DrawerPortalPrimitive, DrawerOverlayPrimitive, DrawerContentPrimitive, DrawerTitlePrimitive, DrawerDescriptionPrimitive, DrawerClosePrimitive } from './Drawer';

expect.extend(toHaveNoViolations);

function renderDrawer(props = {}) {
    return render(
        <DrawerPrimitive {...props}>
            <DrawerTriggerPrimitive>Open Drawer</DrawerTriggerPrimitive>
            <DrawerPortalPrimitive>
                <DrawerOverlayPrimitive data-testid="overlay" />
                <DrawerContentPrimitive data-testid="content">
                    <DrawerTitlePrimitive>Drawer Title</DrawerTitlePrimitive>
                    <DrawerDescriptionPrimitive>Drawer Description</DrawerDescriptionPrimitive>
                    <DrawerClosePrimitive>Close</DrawerClosePrimitive>
                </DrawerContentPrimitive>
            </DrawerPortalPrimitive>
        </DrawerPrimitive>,
    );
}

describe('DrawerPrimitive', () => {
    it('renders trigger', () => {
        renderDrawer();
        expect(screen.getByRole('button', { name: 'Open Drawer' })).toBeInTheDocument();
    });

    it('opens on trigger click', async () => {
        const user = userEvent.setup();
        renderDrawer();
        await user.click(screen.getByRole('button', { name: 'Open Drawer' }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes on Escape', async () => {
        const user = userEvent.setup();
        renderDrawer({ defaultOpen: true });
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('closes on overlay click', async () => {
        const user = userEvent.setup();
        renderDrawer({ defaultOpen: true });
        await user.click(screen.getByTestId('overlay'));
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('has data-side attribute', () => {
        renderDrawer({ defaultOpen: true, side: 'left' });
        expect(screen.getByTestId('content')).toHaveAttribute('data-side', 'left');
    });

    it('has no axe violations', async () => {
        const { container } = renderDrawer({ defaultOpen: true });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
