'use client';

export function AspectRatioPreview(): React.ReactElement {
    const ratios = [
        { name: '16:9', cls: 'aspect-video' },
        { name: '4:3', cls: 'aspect-[4/3]' },
        { name: '1:1', cls: 'aspect-square' },
    ];

    return (
        <div className="w-full max-w-lg grid grid-cols-3 gap-4">
            {ratios.map((r) => (
                <div key={r.name} className="space-y-1">
                    <div className={`${r.cls} w-full rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center dark:bg-gray-800 dark:border-gray-700`}>
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{r.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
