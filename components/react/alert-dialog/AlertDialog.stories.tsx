import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './AlertDialog';
const meta: Meta<typeof AlertDialog> = { title: 'Components/Feedback/AlertDialog', component: AlertDialog, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof AlertDialog>;
export const Default: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialog.Trigger className="rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground">Delete Account</AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Header>
                    <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                    <AlertDialog.Description>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action>Yes, delete account</AlertDialog.Action>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    ),
};
