import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TooltipPrimitive, TooltipTriggerPrimitive, TooltipContentPrimitive } from './Tooltip';

expect.extend(toHaveNoViolations);

describe('TooltipPrimitive', () => {
    it('shows on hover after delay', async () => {
        const user = userEvent.setup();
        render(
            <TooltipPrimitive delayDuration={0}>
                <TooltipTriggerPrimitive>Hover me</TooltipTriggerPrimitive>
                <TooltipContentPrimitive>Tooltip text</TooltipContentPrimitive>
            </TooltipPrimitive>,
        );
        await user.hover(screen.getByText('Hover me'));
        await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
    });

    it('hides on mouse leave', async () => {
        const user = userEvent.setup();
        render(
            <TooltipPrimitive delayDuration={0}>
                <TooltipTriggerPrimitive>Hover me</TooltipTriggerPrimitive>
                <TooltipContentPrimitive>Tooltip text</TooltipContentPrimitive>
            </TooltipPrimitive>,
        );
        await user.hover(screen.getByText('Hover me'));
        await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
        await user.unhover(screen.getByText('Hover me'));
        await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        const { container } = render(
            <TooltipPrimitive defaultOpen>
                <TooltipTriggerPrimitive>Hover me</TooltipTriggerPrimitive>
                <TooltipContentPrimitive>Tooltip text</TooltipContentPrimitive>
            </TooltipPrimitive>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
