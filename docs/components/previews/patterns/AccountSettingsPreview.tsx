'use client';

import { Shield, Trash2 } from 'lucide-react';

export function AccountSettingsPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm space-y-3">
            <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4 border-b dark:border-gray-800">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Account</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage account settings.</p>
                </div>
                <div className="divide-y dark:divide-gray-800">
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Change Password</span>
                        </div>
                        <div className="space-y-2">
                            <input type="password" placeholder="Current password" className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                            <input type="password" placeholder="New password" className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Trash2 className="h-4 w-4 text-red-500" />
                                <div>
                                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Permanently remove your data</p>
                                </div>
                            </div>
                            <button type="button" className="h-8 px-3 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
