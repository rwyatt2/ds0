import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Dialog } from './index';

expect.extend(toHaveNoViolations);

describe('Dialog (Styled)', () => {
    it('opens and closes', async () => {
        const user = userEvent.setup();
        render(
            <Dialog>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Desc</Dialog.Description>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog>,
        );

        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Close' }));
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    it('has no axe violations when open', async () => {
        render(
            <Dialog defaultOpen>
                <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Desc</Dialog.Description>
                </Dialog.Content>
            </Dialog>,
        );
        const results = await axe(document.body);
        expect(results).toHaveNoViolations();
    });
});
