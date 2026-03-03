import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PopoverPrimitive, PopoverTriggerPrimitive, PopoverContentPrimitive } from './Popover';

expect.extend(toHaveNoViolations);

describe('PopoverPrimitive', () => {
    it('opens on trigger click', async () => {
        const user = userEvent.setup();
        render(
            <PopoverPrimitive>
                <PopoverTriggerPrimitive>Toggle</PopoverTriggerPrimitive>
                <PopoverContentPrimitive>Content</PopoverContentPrimitive>
            </PopoverPrimitive>,
        );
        await user.click(screen.getByRole('button', { name: 'Toggle' }));
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('closes on Escape', async () => {
        const user = userEvent.setup();
        render(
            <PopoverPrimitive defaultOpen>
                <PopoverTriggerPrimitive>Toggle</PopoverTriggerPrimitive>
                <PopoverContentPrimitive>Content</PopoverContentPrimitive>
            </PopoverPrimitive>,
        );
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        const { container } = render(
            <PopoverPrimitive>
                <PopoverTriggerPrimitive>Toggle</PopoverTriggerPrimitive>
                <PopoverContentPrimitive>Content</PopoverContentPrimitive>
            </PopoverPrimitive>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
