'use client';

export function StackPreview(): React.ReactElement {
    const Box = ({ n }: { n: number }) => (
        <div className="h-10 w-10 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-mono text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
            {n}
        </div>
    );

    return (
        <div className="w-full max-w-md space-y-6">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Horizontal</p>
                <div className="flex gap-2">
                    <Box n={1} /><Box n={2} /><Box n={3} /><Box n={4} />
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Vertical</p>
                <div className="flex flex-col gap-2 w-fit">
                    <Box n={1} /><Box n={2} /><Box n={3} />
                </div>
            </div>
        </div>
    );
}
