'use client';

const variants = [
    { name: 'Default', cls: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
    { name: 'Secondary', cls: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
    { name: 'Destructive', cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
    { name: 'Success', cls: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    { name: 'Warning', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
    { name: 'Outline', cls: 'bg-transparent text-gray-800 border border-gray-300 dark:text-gray-200 dark:border-gray-600' },
];

export function BadgePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-4">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <div className="flex flex-wrap items-center gap-2">
                    {variants.map((v) => (
                        <span
                            key={v.name}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${v.cls}`}
                        >
                            {v.name}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-medium dark:bg-blue-900/30 dark:text-blue-400">
                        Small
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-medium dark:bg-blue-900/30 dark:text-blue-400">
                        Medium
                    </span>
                </div>
            </div>
        </div>
    );
}
