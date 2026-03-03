'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

export function PopoverPreview(): React.ReactElement {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-sm flex justify-center">
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="inline-flex items-center justify-center gap-2 rounded-md font-medium bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors h-10 px-4 text-sm dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                >
                    <Settings className="h-4 w-4" /> Options
                </button>
                {open && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-900 dark:border-gray-700 z-10">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Display Settings</p>
                        <div className="space-y-2">
                            <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                Compact mode
                                <div className="h-5 w-9 rounded-full bg-blue-600 relative">
                                    <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white shadow" />
                                </div>
                            </label>
                            <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                Show tooltips
                                <div className="h-5 w-9 rounded-full bg-gray-300 relative dark:bg-gray-600">
                                    <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow" />
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
