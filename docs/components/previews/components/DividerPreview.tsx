'use client';

export function DividerPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md space-y-6">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Horizontal</p>
                <div className="space-y-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Content above</p>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">Content below</p>
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">With Label</p>
                <div className="flex items-center gap-3">
                    <hr className="flex-1 border-gray-200 dark:border-gray-700" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
                    <hr className="flex-1 border-gray-200 dark:border-gray-700" />
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Vertical</p>
                <div className="flex items-center gap-3 h-8">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Item A</span>
                    <div className="w-px h-full bg-gray-200 dark:bg-gray-700" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Item B</span>
                    <div className="w-px h-full bg-gray-200 dark:bg-gray-700" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Item C</span>
                </div>
            </div>
        </div>
    );
}
