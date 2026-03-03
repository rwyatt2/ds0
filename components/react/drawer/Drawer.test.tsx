import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Drawer } from './index';

expect.extend(toHaveNoViolations);

describe('Drawer (Styled)', () => {
    it('opens and closes', async () => {
        const user = userEvent.setup();
        render(
            <Drawer>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Content><Drawer.Title>Title</Drawer.Title><Drawer.Description>Desc</Drawer.Description><Drawer.Close>Close</Drawer.Close></Drawer.Content>
            </Drawer>,
        );
        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Close' }));
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        render(
            <Drawer defaultOpen><Drawer.Content><Drawer.Title>Title</Drawer.Title><Drawer.Description>Desc</Drawer.Description></Drawer.Content></Drawer>,
        );
        const results = await axe(document.body);
        expect(results).toHaveNoViolations();
    });
});
