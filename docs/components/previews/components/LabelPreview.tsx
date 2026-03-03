'use client';

export function LabelPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Email Address
                </label>
                <div className="h-10 rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700" />
            </div>
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Username <span className="text-red-500">*</span>
                </label>
                <div className="h-10 rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Choose a unique username.</p>
            </div>
        </div>
    );
}
