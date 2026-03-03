'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';

export function ProfileSettingsPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4 border-b dark:border-gray-800">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Profile</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage your public profile.</p>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-medium">JD</div>
                            <button type="button" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gray-900 text-white flex items-center justify-center border-2 border-white dark:border-gray-900">
                                <Camera className="h-3 w-3" />
                            </button>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Jane Cooper</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">jane@example.com</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-900 dark:text-gray-100">Display Name</label>
                            <input type="text" defaultValue="Jane Cooper" className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-900 dark:text-gray-100">Bio</label>
                            <textarea rows={2} defaultValue="Product designer at Acme Inc." className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm resize-y dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 border-t p-4 dark:border-gray-800">
                    <button type="button" className="h-8 px-3 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Cancel</button>
                    <button type="button" className="h-8 px-3 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
}
