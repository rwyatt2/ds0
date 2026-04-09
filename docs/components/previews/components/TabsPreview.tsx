'use client';

import { Tabs } from '../../../../components/react/tabs';

export function TabsPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <Tabs defaultValue="account">
                <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="account">
                    <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>Manage your account settings, profile information, and preferences.</p>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="notifications">
                    <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>Configure email, push, and in-app notification preferences.</p>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="billing">
                    <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>View invoices, update payment methods, and manage your subscription.</p>
                    </div>
                </Tabs.Content>
            </Tabs>
        </div>
    );
}
