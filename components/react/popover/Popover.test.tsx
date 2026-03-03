import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Popover } from './index';

expect.extend(toHaveNoViolations);

describe('Popover (Styled)', () => {
    it('opens and closes', async () => {
        const user = userEvent.setup();
        render(
            <Popover><Popover.Trigger>Toggle</Popover.Trigger><Popover.Content>Content</Popover.Content></Popover>,
        );
        await user.click(screen.getByRole('button', { name: 'Toggle' }));
        expect(screen.getByText('Content')).toBeInTheDocument();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        const { container } = render(
            <Popover><Popover.Trigger>Toggle</Popover.Trigger><Popover.Content>Content</Popover.Content></Popover>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
