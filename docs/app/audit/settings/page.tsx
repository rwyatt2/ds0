// @ts-nocheck
'use client';

/**
 * TaskFlow — Settings Page
 *
 * AUDIT TEST: Tests the following DS0 components in composition:
 * - Card (compound)
 * - Button (all variants)
 * - Switch (toggle settings)
 * - Select (dropdown menus)
 * - RadioGroup (option selection)
 * - TextField (text input)
 * - TextArea (multi-line input)
 * - Heading (section headers)
 * - Text (descriptions)
 * - Stack (layout)
 * - Divider (section separation)
 * - Dialog (confirmation modal)
 * - Toast (success/error feedback)
 * - Label (form labels)
 * - Tabs (settings sections)
 */

import { useState } from 'react';

import { Card } from '../../../../components/react/card';
import { Button } from '../../../../components/react/button';
import { Switch } from '../../../../components/react/switch';
import { Select } from '../../../../components/react/select';
import { RadioGroup } from '../../../../components/react/radio-group';
import { TextField } from '../../../../components/react/text-field';
import { TextArea } from '../../../../components/react/text-area';
import { Heading } from '../../../../components/react/heading';
import { Text } from '../../../../components/react/text';
import { Stack } from '../../../../components/react/stack';
import { Divider } from '../../../../components/react/divider';
import { Dialog } from '../../../../components/react/dialog';
import { Toast } from '../../../../components/react/toast';
import { Label } from '../../../../components/react/label';
import { Tabs } from '../../../../components/react/tabs';

export default function SettingsPage(): React.ReactElement {
    // Profile state
    const [displayName, setDisplayName] = useState('Alex Johnson');
    const [bio, setBio] = useState('Design system enthusiast. Building the future of UI.');
    const [email] = useState('alex@example.com');

    // Notification state
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [weeklyDigest, setWeeklyDigest] = useState(true);

    // Appearance state
    const [theme, setTheme] = useState('system');
    const [density, setDensity] = useState('comfortable');

    // Dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (): void => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 1000);
    };

    return (
        <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <Stack gap="1" className="mb-8">
                <Heading level={1} size="2xl">Settings</Heading>
                <Text color="muted">Manage your account preferences and configuration.</Text>
            </Stack>

            <Tabs defaultValue="profile">
                <Tabs.List className="mb-6">
                    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                    <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
                    <Tabs.Trigger value="danger">Danger Zone</Tabs.Trigger>
                </Tabs.List>

                {/* ─── Profile Tab ──────────────────────────────── */}
                <Tabs.Content value="profile">
                    <Card>
                        <Card.Header>
                            <Card.Title>Profile Information</Card.Title>
                            <Card.Description>Update your personal details.</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="6">
                                <Stack gap="2">
                                    <Label htmlFor="display-name">Display Name</Label>
                                    <TextField
                                        id="display-name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Your display name"
                                    />
                                </Stack>

                                <Stack gap="2">
                                    <Label htmlFor="email-field">Email</Label>
                                    <TextField
                                        id="email-field"
                                        value={email}
                                        isDisabled
                                        helperText="Email cannot be changed."
                                    />
                                    {/* 🔥 FRICTION #8: TextField has a `helperText` prop 
                                        but it's unclear if it's actually implemented — need to check.
                                        Many components have documented but unimplemented features. */}
                                </Stack>

                                <Stack gap="2">
                                    <Label htmlFor="bio-field">Bio</Label>
                                    <TextArea
                                        id="bio-field"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us about yourself"
                                        rows={4}
                                    />
                                    {/* 🔥 FRICTION #9: TextArea may not accept rows prop
                                        — need to check if native HTML props pass through. */}
                                </Stack>
                            </Stack>
                        </Card.Content>
                        <Card.Footer className="justify-end gap-3">
                            <Button variant="ghost" onClick={() => { setDisplayName('Alex Johnson'); setBio('Design system enthusiast.'); }}>
                                Reset
                            </Button>
                            <Button variant="primary" isLoading={isSaving} loadingText="Saving..." onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Card.Footer>
                    </Card>
                </Tabs.Content>

                {/* ─── Notifications Tab ────────────────────────── */}
                <Tabs.Content value="notifications">
                    <Card>
                        <Card.Header>
                            <Card.Title>Notification Preferences</Card.Title>
                            <Card.Description>Choose how you want to be notified.</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="6">
                                <Stack direction="horizontal" justify="between" align="center">
                                    <Stack gap="1">
                                        <Text className="font-medium">Email Notifications</Text>
                                        <Text size="sm" color="muted">Receive email updates about project activity.</Text>
                                    </Stack>
                                    <Switch
                                        checked={emailNotifs}
                                        onCheckedChange={setEmailNotifs}
                                    />
                                </Stack>
                                <Divider />
                                <Stack direction="horizontal" justify="between" align="center">
                                    <Stack gap="1">
                                        <Text className="font-medium">Push Notifications</Text>
                                        <Text size="sm" color="muted">Get push notifications on your device.</Text>
                                    </Stack>
                                    <Switch
                                        checked={pushNotifs}
                                        onCheckedChange={setPushNotifs}
                                    />
                                </Stack>
                                <Divider />
                                <Stack direction="horizontal" justify="between" align="center">
                                    <Stack gap="1">
                                        <Text className="font-medium">Weekly Digest</Text>
                                        <Text size="sm" color="muted">A summary of activity sent every Monday.</Text>
                                    </Stack>
                                    <Switch
                                        checked={weeklyDigest}
                                        onCheckedChange={setWeeklyDigest}
                                    />
                                </Stack>
                            </Stack>
                        </Card.Content>
                    </Card>
                </Tabs.Content>

                {/* ─── Appearance Tab ───────────────────────────── */}
                <Tabs.Content value="appearance">
                    <Card>
                        <Card.Header>
                            <Card.Title>Appearance</Card.Title>
                            <Card.Description>Customize the look and feel.</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="8">
                                {/* Theme Select */}
                                <Stack gap="3">
                                    <Label>Theme</Label>
                                    <Select value={theme} onValueChange={setTheme}>
                                        <Select.Trigger className="w-64">
                                            {theme === 'light' ? '☀️ Light' : theme === 'dark' ? '🌙 Dark' : '💻 System'}
                                        </Select.Trigger>
                                        <Select.Content>
                                            <Select.Item value="light" label="Light">☀️ Light</Select.Item>
                                            <Select.Item value="dark" label="Dark">🌙 Dark</Select.Item>
                                            <Select.Item value="system" label="System">💻 System</Select.Item>
                                        </Select.Content>
                                    </Select>
                                    {/* 🔥 FRICTION #10: Theme selection is display-only here because
                                        DS0 has no theme switching mechanism built in.
                                        dark.json exists but there's no ThemeProvider or CSS toggle. */}
                                </Stack>

                                <Divider />

                                {/* Density RadioGroup */}
                                <Stack gap="3">
                                    <Label>Density</Label>
                                    <RadioGroup value={density} onValueChange={setDensity}>
                                        <RadioGroup.Item value="compact" label="Compact — Dense UI with smaller spacing" />
                                        <RadioGroup.Item value="comfortable" label="Comfortable — Default spacing" />
                                        <RadioGroup.Item value="spacious" label="Spacious — More breathing room" />
                                    </RadioGroup>
                                    {/* 🔥 FRICTION #11: Density modes are described in ARCHITECTURE.md
                                        and tokens/_semantic/spacing.json, but no DensityProvider exists
                                        to actually apply different spacing scales. The docs app has a
                                        DensityProvider but it only affects preview scaling. */}
                                </Stack>
                            </Stack>
                        </Card.Content>
                    </Card>
                </Tabs.Content>

                {/* ─── Danger Zone Tab ──────────────────────────── */}
                <Tabs.Content value="danger">
                    <Card className="border-red-200 dark:border-red-900">
                        <Card.Header>
                            <Card.Title>Danger Zone</Card.Title>
                            <Card.Description>Irreversible actions. Proceed with caution.</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="6">
                                <Stack direction="horizontal" justify="between" align="center">
                                    <Stack gap="1">
                                        <Text className="font-medium">Delete Account</Text>
                                        <Text size="sm" color="muted">Permanently delete your account and all data.</Text>
                                    </Stack>
                                    <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                                        Delete Account
                                    </Button>
                                </Stack>
                            </Stack>
                        </Card.Content>
                    </Card>
                </Tabs.Content>
            </Tabs>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
                        <Dialog.Description>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                        <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
                            Delete Account
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog>

            {/* Toast */}
            {showToast && (
                <Toast variant="default" className="fixed bottom-4 right-4 z-50">
                    <Toast.Title>Settings saved</Toast.Title>
                    <Toast.Description>Your changes have been saved successfully.</Toast.Description>
                </Toast>
            )}

            {/* Navigation Footer */}
            <Divider className="my-8" />
            <Stack direction="horizontal" justify="center" gap="4">
                <Button variant="ghost" onClick={() => window.location.href = '/audit/login'}>← Login</Button>
                <Button variant="ghost" onClick={() => window.location.href = '/audit/dashboard'}>Dashboard</Button>
            </Stack>
        </div>
    );
}
