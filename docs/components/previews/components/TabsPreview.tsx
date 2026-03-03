'use client';

import { useState } from 'react';

const tabs = ['Account', 'Security', 'Notifications'];
const content: Record<string, string> = {
    Account: 'Manage your account settings, profile information, and preferences.',
    Security: 'Update your password, enable two-factor authentication, and manage sessions.',
    Notifications: 'Choose which notifications you receive and how they are delivered.',
};

export function TabsPreview(): React.ReactElement {
    const [active, setActive] = useState('Account');

    return (
        <div className="w-full max-w-md">
            <div className="flex border-b dark:border-gray-700">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActive(tab)}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${active === tab
                                ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                                : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
                {content[active]}
            </div>
        </div>
    );
}
