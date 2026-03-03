import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Dialog } from './index';

const meta: Meta<typeof Dialog> = {
    title: 'Components/Overlay/Dialog',
    component: Dialog,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
    render: () => (
        <Dialog>
            <Dialog.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Dialog
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Are you sure?</Dialog.Title>
                <Dialog.Description>
                    This action cannot be undone. This will permanently delete your account.
                </Dialog.Description>
                <div className="flex justify-end gap-2">
                    <Dialog.Close className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm">
                        Cancel
                    </Dialog.Close>
                    <button className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground">
                        Yes, delete
                    </button>
                </div>
            </Dialog.Content>
        </Dialog>
    ),
};

export const Small: Story = {
    render: () => (
        <Dialog>
            <Dialog.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Small Dialog
            </Dialog.Trigger>
            <Dialog.Content size="sm">
                <Dialog.Title>Small Dialog</Dialog.Title>
                <Dialog.Description>A compact dialog for simple confirmations.</Dialog.Description>
                <Dialog.Close className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm">
                    Got it
                </Dialog.Close>
            </Dialog.Content>
        </Dialog>
    ),
};

export const Large: Story = {
    render: () => (
        <Dialog>
            <Dialog.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Large Dialog
            </Dialog.Trigger>
            <Dialog.Content size="lg">
                <Dialog.Title>Terms of Service</Dialog.Title>
                <Dialog.Description>
                    Please read and accept the terms of service before proceeding.
                </Dialog.Description>
                <div className="max-h-64 overflow-y-auto rounded-md border p-4 text-sm">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="flex justify-end gap-2">
                    <Dialog.Close className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm">
                        Decline
                    </Dialog.Close>
                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Accept
                    </button>
                </div>
            </Dialog.Content>
        </Dialog>
    ),
};

export const WithForm: Story = {
    render: () => (
        <Dialog>
            <Dialog.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Edit Profile
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Edit Profile</Dialog.Title>
                <Dialog.Description>
                    Make changes to your profile here. Click save when done.
                </Dialog.Description>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            defaultValue="John Doe"
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="username" className="text-right text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            defaultValue="@johndoe"
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                </form>
                <div className="flex justify-end">
                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Save changes
                    </button>
                </div>
            </Dialog.Content>
        </Dialog>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        return (
            <div>
                <button
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    onClick={() => setOpen(true)}
                >
                    Open Controlled Dialog
                </button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <Dialog.Content>
                        <Dialog.Title>Controlled Dialog</Dialog.Title>
                        <Dialog.Description>
                            This dialog&apos;s open state is controlled externally.
                        </Dialog.Description>
                        <Dialog.Close className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm">
                            Close
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog>
            </div>
        );
    },
};
