import React, { useMemo } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '@ds0/components/react/card';
import { Stack } from '@ds0/components/react/stack';
import { Heading } from '@ds0/components/react/heading';
import { Text } from '@ds0/components/react/text';
import { Switch } from '@ds0/components/react/switch';
import { Divider } from '@ds0/components/react/divider';
import { Button } from '@ds0/components/react/button';

/**
 * A single notification setting.
 */
interface NotificationSetting {
    id: string;
    category: string;
    label: string;
    description: string;
    enabled: boolean;
}

/**
 * Props for the NotificationSettings recipe component.
 */
interface NotificationSettingsProps {
    /** Current notification settings */
    settings: NotificationSetting[];
    /** Toggle handler */
    onSettingChange: (id: string, enabled: boolean) => void;
    /** Save all handler */
    onSave?: () => void | Promise<void>;
    /** Loading state */
    isLoading?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * NotificationSettings recipe.
 * A notification preferences panel with categorized toggle switches.
 *
 * @example
 * ```tsx
 * <NotificationSettings
 *   settings={[
 *     { id: '1', category: 'Email', label: 'Marketing', description: 'Receive marketing emails', enabled: true },
 *   ]}
 *   onSettingChange={(id, enabled) => updateSetting(id, enabled)}
 * />
 * ```
 */
function NotificationSettings({
    settings,
    onSettingChange,
    onSave,
    isLoading = false,
    className,
}: NotificationSettingsProps): React.ReactElement {
    const categories = useMemo(() => {
        const grouped = new Map<string, NotificationSetting[]>();
        for (const setting of settings) {
            const group = grouped.get(setting.category) ?? [];
            group.push(setting);
            grouped.set(setting.category, group);
        }
        return Array.from(grouped.entries());
    }, [settings]);

    return (
        <Card className={cn('w-full max-w-2xl', className)}>
            <Card.Header>
                <Card.Title>Notifications</Card.Title>
                <Card.Description>Choose what notifications you want to receive.</Card.Description>
            </Card.Header>
            <Card.Content>
                <Stack gap="6">
                    {categories.map(([category, items], index) => (
                        <div key={category}>
                            {index > 0 && <Divider className="mb-6" />}
                            <Stack gap="4">
                                <Heading as="h4" size="sm" weight="semibold">
                                    {category}
                                </Heading>
                                {items.map((setting) => (
                                    <Switch
                                        key={setting.id}
                                        label={setting.label}
                                        description={setting.description}
                                        checked={setting.enabled}
                                        onCheckedChange={(checked) =>
                                            onSettingChange(setting.id, checked)
                                        }
                                    />
                                ))}
                            </Stack>
                        </div>
                    ))}

                    {onSave && (
                        <Stack direction="horizontal" justify="end">
                            <Button onClick={onSave} isLoading={isLoading}>
                                Save preferences
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Card.Content>
        </Card>
    );
}

NotificationSettings.displayName = 'NotificationSettings';

export { NotificationSettings };
export type { NotificationSettingsProps, NotificationSetting };
