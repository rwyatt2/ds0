'use client';

export function ContainerPreview(): React.ReactElement {
    const widths = [
        { name: 'sm', max: '640px' },
        { name: 'md', max: '768px' },
        { name: 'lg', max: '1024px' },
        { name: 'xl', max: '1280px' },
    ];

    return (
        <div className="w-full max-w-lg space-y-3">
            {widths.map((w) => (
                <div key={w.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{w.name}</span>
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{w.max}</span>
                    </div>
                    <div className="relative h-6 rounded bg-gray-100 dark:bg-gray-800">
                        <div
                            className="h-full rounded bg-blue-100 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800"
                            style={{ width: `${(parseInt(w.max) / 1280) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
