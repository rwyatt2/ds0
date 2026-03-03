'use client';

import { Plus, Pencil, Trash2, Search, MoreHorizontal } from 'lucide-react';

export function IconButtonPreview(): React.ReactElement {
    const buttons = [
        { icon: Plus, label: 'Add', variant: 'bg-blue-600 text-white hover:bg-blue-700' },
        { icon: Pencil, label: 'Edit', variant: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800' },
        { icon: Trash2, label: 'Delete', variant: 'bg-transparent text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' },
        { icon: Search, label: 'Search', variant: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100' },
        { icon: MoreHorizontal, label: 'More', variant: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100' },
    ];

    return (
        <div className="w-full max-w-sm">
            <div className="flex items-center gap-2">
                {buttons.map((b) => {
                    const Icon = b.icon;
                    return (
                        <button
                            key={b.label}
                            type="button"
                            aria-label={b.label}
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors ${b.variant}`}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
