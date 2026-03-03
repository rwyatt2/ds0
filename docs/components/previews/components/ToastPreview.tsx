'use client';

import { CheckCircle2, XCircle, X } from 'lucide-react';

export function ToastPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-white p-4 shadow-lg dark:bg-gray-900 dark:border-green-800">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Changes saved</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Your settings have been updated.</p>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X className="h-4 w-4" />
                </button>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-white p-4 shadow-lg dark:bg-gray-900 dark:border-red-800">
                <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Upload failed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">File size exceeds 10MB limit.</p>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
