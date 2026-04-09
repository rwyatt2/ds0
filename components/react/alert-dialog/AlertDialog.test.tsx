import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AlertDialog } from './AlertDialog';
expect.extend(toHaveNoViolations);
describe('AlertDialog (Styled)', () => {
    it('renders trigger', () => { render(<AlertDialog><AlertDialog.Trigger>Delete</AlertDialog.Trigger><AlertDialog.Content><AlertDialog.Title>Sure?</AlertDialog.Title><AlertDialog.Cancel>No</AlertDialog.Cancel></AlertDialog.Content></AlertDialog>); expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument(); });
    it('opens on click', async () => { const user = userEvent.setup(); render(<AlertDialog><AlertDialog.Trigger>Delete</AlertDialog.Trigger><AlertDialog.Content><AlertDialog.Title>Sure?</AlertDialog.Title><AlertDialog.Cancel>No</AlertDialog.Cancel></AlertDialog.Content></AlertDialog>); await user.click(screen.getByRole('button', { name: 'Delete' })); expect(screen.getByRole('alertdialog')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<AlertDialog><AlertDialog.Trigger>Delete</AlertDialog.Trigger><AlertDialog.Content><AlertDialog.Title>Sure?</AlertDialog.Title><AlertDialog.Cancel>No</AlertDialog.Cancel></AlertDialog.Content></AlertDialog>); expect(await axe(container)).toHaveNoViolations(); });
});
