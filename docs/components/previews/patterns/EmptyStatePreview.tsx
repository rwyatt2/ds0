'use client';

import { Inbox } from 'lucide-react';

export function EmptyStatePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4 dark:bg-gray-800">
                    <Inbox className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No results found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                    Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <div className="flex gap-2 mt-6">
                    <button type="button" className="h-9 px-4 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        Clear Filters
                    </button>
                    <button type="button" className="h-9 px-4 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
