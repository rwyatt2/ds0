'use client';

export function SkeletonPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm space-y-6">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Text Skeleton</p>
                <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                    <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Card Skeleton</p>
                <div className="rounded-lg border p-4 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse dark:bg-gray-700" />
                        <div className="space-y-1.5 flex-1">
                            <div className="h-3 w-1/3 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                            <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                        </div>
                    </div>
                    <div className="h-32 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );
}
