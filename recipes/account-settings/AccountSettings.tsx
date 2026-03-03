import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '../../components/react/card';
import { Stack } from '../../components/react/stack';
import { Text } from '../../components/react/text';
import { Heading } from '../../components/react/heading';
import { Button } from '../../components/react/button';
import { Alert } from '../../components/react/alert';
import { TextField } from '../../components/react/text-field';
import { Dialog } from '../../components/react/dialog';

/**
 * Props for the AccountSettings recipe component.
 */
interface AccountSettingsProps {
    /** Current email */
    email: string;
    /** Password change handler */
    onChangePassword: (data: { current: string; newPassword: string }) => void | Promise<void>;
    /** Email change handler */
    onChangeEmail: (email: string) => void | Promise<void>;
    /** Delete account handler */
    onDeleteAccount: () => void | Promise<void>;
    /** Additional CSS classes */
    className?: string;
}

/**
 * AccountSettings recipe.
 * Account management panel with password change, email change, and danger zone (delete account).
 *
 * @example
 * ```tsx
 * <AccountSettings
 *   email="john@example.com"
 *   onChangePassword={({ current, newPassword }) => changePassword(current, newPassword)}
 *   onChangeEmail={(email) => changeEmail(email)}
 *   onDeleteAccount={() => deleteAccount()}
 * />
 * ```
 */
function AccountSettings({
    email,
    onChangePassword,
    onChangeEmail,
    onDeleteAccount,
    className,
}: AccountSettingsProps): React.ReactElement {
    const [newEmail, setNewEmail] = useState(email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleChangePassword = (e: React.FormEvent): void => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        if (!currentPassword) {
            setPasswordError('Current password is required');
            return;
        }
        setPasswordError('');
        onChangePassword({ current: currentPassword, newPassword });
    };

    const handleChangeEmail = (e: React.FormEvent): void => {
        e.preventDefault();
        onChangeEmail(newEmail);
    };

    const handleDeleteConfirm = (): void => {
        setDeleteDialogOpen(false);
        onDeleteAccount();
    };

    return (
        <Stack gap="6" className={cn('w-full max-w-2xl', className)}>
            {/* Change Email */}
            <Card>
                <Card.Header>
                    <Card.Title>Email address</Card.Title>
                    <Card.Description>Update your email address.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <form onSubmit={handleChangeEmail}>
                        <Stack gap="4">
                            <TextField
                                label="Email"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                isRequired
                            />
                            <Stack direction="horizontal" justify="end">
                                <Button type="submit">Update email</Button>
                            </Stack>
                        </Stack>
                    </form>
                </Card.Content>
            </Card>

            {/* Change Password */}
            <Card>
                <Card.Header>
                    <Card.Title>Password</Card.Title>
                    <Card.Description>Change your password.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <form onSubmit={handleChangePassword}>
                        <Stack gap="4">
                            {passwordError && (
                                <Alert variant="destructive">
                                    <Alert.Description>{passwordError}</Alert.Description>
                                </Alert>
                            )}
                            <TextField
                                label="Current password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoComplete="current-password"
                                isRequired
                            />
                            <TextField
                                label="New password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                                isRequired
                            />
                            <TextField
                                label="Confirm new password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                isRequired
                            />
                            <Stack direction="horizontal" justify="end">
                                <Button type="submit">Update password</Button>
                            </Stack>
                        </Stack>
                    </form>
                </Card.Content>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
                <Card.Header>
                    <Card.Title className="text-destructive">Danger zone</Card.Title>
                    <Card.Description>
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <Button
                        variant="destructive"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Delete account
                    </Button>
                </Card.Content>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <Dialog.Content>
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Description>
                        This action is permanent. All your data will be deleted and cannot be recovered.
                    </Dialog.Description>
                    <Stack direction="horizontal" gap="3" justify="end" className="pt-4">
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete account
                        </Button>
                    </Stack>
                </Dialog.Content>
            </Dialog>
        </Stack>
    );
}

AccountSettings.displayName = 'AccountSettings';

export { AccountSettings };
export type { AccountSettingsProps };
