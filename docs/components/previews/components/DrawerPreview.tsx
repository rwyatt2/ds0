'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function DrawerPreview(): React.ReactElement {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-sm">
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors h-10 px-4 text-sm"
            >
                Open Drawer
            </button>
            {open && (
                <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setOpen(false)}>
                    <div className="fixed inset-0 bg-black/50" />
                    <div
                        className="relative z-10 h-full w-full max-w-sm border-l bg-white shadow-xl dark:bg-gray-900 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h3>
                            <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Drawer content slides in from the side. Perfect for settings, filters, and detail panels.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
