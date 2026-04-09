import React, { useState, useRef } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '@ds0/components/react/card';
import { Stack } from '@ds0/components/react/stack';
import { Text } from '@ds0/components/react/text';
import { Button } from '@ds0/components/react/button';
import { Alert } from '@ds0/components/react/alert';
import { TextField } from '@ds0/components/react/text-field';
import { Avatar } from '@ds0/components/react/avatar';
import { Divider } from '@ds0/components/react/divider';

/**
 * Profile data for the ProfileSettings recipe.
 */
interface ProfileData {
    name: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
}

/**
 * Props for the ProfileSettings recipe component.
 */
interface ProfileSettingsProps {
    /** Current profile data */
    initialValues: ProfileData;
    /** Save handler */
    onSubmit: (data: ProfileData) => void | Promise<void>;
    /** Cancel handler */
    onCancel?: () => void;
    /** Avatar upload handler */
    onAvatarChange?: (file: File) => void | Promise<string>;
    /** Loading state */
    isLoading?: boolean;
    /** Error message */
    error?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * ProfileSettings recipe.
 * A profile editing form with avatar upload, name, email, bio, and save/cancel actions.
 *
 * @example
 * ```tsx
 * <ProfileSettings
 *   initialValues={{ name: 'John Doe', email: 'john@example.com' }}
 *   onSubmit={(data) => updateProfile(data)}
 * />
 * ```
 */
function ProfileSettings({
    initialValues,
    onSubmit,
    onCancel,
    onAvatarChange,
    isLoading = false,
    error,
    className,
}: ProfileSettingsProps): React.ReactElement {
    const [name, setName] = useState(initialValues.name);
    const [email, setEmail] = useState(initialValues.email);
    const [bio, setBio] = useState(initialValues.bio ?? '');
    const [avatarUrl, setAvatarUrl] = useState(initialValues.avatarUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        onSubmit({ name, email, bio, avatarUrl });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file && onAvatarChange) {
            const result = onAvatarChange(file);
            if (result instanceof Promise) {
                result.then((url) => {
                    if (url) setAvatarUrl(url);
                });
            }
        }
    };

    return (
        <Card className={cn('w-full max-w-2xl', className)}>
            <Card.Header>
                <Card.Title>Profile</Card.Title>
                <Card.Description>Manage your public profile information.</Card.Description>
            </Card.Header>
            <Card.Content>
                <form onSubmit={handleSubmit}>
                    <Stack gap="6">
                        {error && (
                            <Alert variant="destructive">
                                <Alert.Description>{error}</Alert.Description>
                            </Alert>
                        )}

                        {/* Avatar Section */}
                        <Stack direction="horizontal" gap="6" align="center">
                            <Avatar
                                src={avatarUrl}
                                alt={initialValues.name}
                                size="xl"
                            />
                            {onAvatarChange && (
                                <Stack gap="2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Change avatar
                                    </Button>
                                    <Text size="xs" color="muted">JPG, PNG, or GIF. Max 2MB.</Text>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                        aria-label="Upload avatar"
                                    />
                                </Stack>
                            )}
                        </Stack>

                        <Divider />

                        <TextField
                            label="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isRequired
                        />

                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isRequired
                        />

                        <div>
                            <TextField
                                label="Bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                helperText="Brief description for your profile. Max 160 characters."
                            />
                            <Text size="xs" color="muted" align="right" className="mt-1">
                                {bio.length}/160
                            </Text>
                        </div>

                        <Stack direction="horizontal" gap="3" justify="end">
                            {onCancel && (
                                <Button variant="ghost" type="button" onClick={onCancel}>
                                    Cancel
                                </Button>
                            )}
                            <Button type="submit" isLoading={isLoading}>
                                Save changes
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Card.Content>
        </Card>
    );
}

ProfileSettings.displayName = 'ProfileSettings';

export { ProfileSettings };
export type { ProfileSettingsProps, ProfileData };
