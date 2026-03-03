import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tooltip } from './index';

expect.extend(toHaveNoViolations);

describe('Tooltip (Styled)', () => {
    it('shows on hover', async () => {
        const user = userEvent.setup();
        render(
            <Tooltip delayDuration={0}><Tooltip.Trigger>Hover</Tooltip.Trigger><Tooltip.Content>Tip</Tooltip.Content></Tooltip>,
        );
        await user.hover(screen.getByText('Hover'));
        await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        const { container } = render(
            <Tooltip defaultOpen><Tooltip.Trigger>Hover</Tooltip.Trigger><Tooltip.Content>Tip</Tooltip.Content></Tooltip>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
