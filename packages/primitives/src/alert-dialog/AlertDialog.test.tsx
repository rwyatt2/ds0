import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AlertDialogPrimitive, AlertDialogTriggerPrimitive, AlertDialogContentPrimitive, AlertDialogTitlePrimitive, AlertDialogDescriptionPrimitive, AlertDialogActionPrimitive, AlertDialogCancelPrimitive } from './AlertDialog';
expect.extend(toHaveNoViolations);

const TestDialog = ({ defaultOpen }: { defaultOpen?: boolean }) => (
    <AlertDialogPrimitive defaultOpen={defaultOpen}>
        <AlertDialogTriggerPrimitive>Delete</AlertDialogTriggerPrimitive>
        <AlertDialogContentPrimitive>
            <AlertDialogTitlePrimitive>Are you sure?</AlertDialogTitlePrimitive>
            <AlertDialogDescriptionPrimitive>This action cannot be undone.</AlertDialogDescriptionPrimitive>
            <AlertDialogCancelPrimitive>Cancel</AlertDialogCancelPrimitive>
            <AlertDialogActionPrimitive>Confirm</AlertDialogActionPrimitive>
        </AlertDialogContentPrimitive>
    </AlertDialogPrimitive>
);

describe('AlertDialogPrimitive', () => {
    it('renders trigger', () => { render(<TestDialog />); expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument(); });
    it('hides content by default', () => { render(<TestDialog />); expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(); });
    it('shows content when defaultOpen', () => { render(<TestDialog defaultOpen />); expect(screen.getByRole('alertdialog')).toBeInTheDocument(); });
    it('opens on trigger click', async () => { const user = userEvent.setup(); render(<TestDialog />); await user.click(screen.getByRole('button', { name: 'Delete' })); expect(screen.getByRole('alertdialog')).toBeInTheDocument(); });
    it('closes on cancel', async () => { const user = userEvent.setup(); render(<TestDialog defaultOpen />); await user.click(screen.getByRole('button', { name: 'Cancel' })); expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(); });
    it('closes on action', async () => { const user = userEvent.setup(); render(<TestDialog defaultOpen />); await user.click(screen.getByRole('button', { name: 'Confirm' })); expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(); });
    it('has role=alertdialog', () => { render(<TestDialog defaultOpen />); expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true'); });
    it('has no axe violations', async () => { const { container } = render(<TestDialog />); expect(await axe(container)).toHaveNoViolations(); });
});
