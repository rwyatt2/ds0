'use client';

import { useState } from 'react';

const notifications = [
    { label: 'Email notifications', desc: 'Receive email about account activity', default: true },
    { label: 'Push notifications', desc: 'Receive push notifications on your device', default: false },
    { label: 'Marketing emails', desc: 'Receive emails about new features and tips', default: false },
    { label: 'Security alerts', desc: 'Get notified about security events', default: true },
];

export function NotificationSettingsPreview(): React.ReactElement {
    const [checks, setChecks] = useState(notifications.map((n) => n.default));

    return (
        <div className="w-full max-w-sm">
            <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4 border-b dark:border-gray-800">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose what you want to be notified about.</p>
                </div>
                <div className="divide-y dark:divide-gray-800">
                    {notifications.map((n, i) => (
                        <div key={n.label} className="flex items-center justify-between p-4">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={checks[i]}
                                onClick={() => {
                                    const next = [...checks];
                                    next[i] = !next[i];
                                    setChecks(next);
                                }}
                                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${checks[i] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            >
                                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${checks[i] ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
