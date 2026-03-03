'use client';

import { AlertTriangle } from 'lucide-react';

export function ErrorPagePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4 dark:bg-red-900/30">
                    <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">404</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Page not found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex gap-2 mt-6">
                    <button type="button" className="h-9 px-4 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        Go Home
                    </button>
                    <button type="button" className="h-9 px-4 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}
