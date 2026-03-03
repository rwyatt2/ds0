'use client';

export function SpinnerPreview(): React.ReactElement {
    const sizes = [
        { name: 'sm', cls: 'h-4 w-4 border-2' },
        { name: 'md', cls: 'h-6 w-6 border-2' },
        { name: 'lg', cls: 'h-8 w-8 border-[3px]' },
    ];

    return (
        <div className="w-full max-w-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">Sizes</p>
            <div className="flex items-center gap-6">
                {sizes.map((s) => (
                    <div key={s.name} className="flex flex-col items-center gap-2">
                        <div
                            className={`${s.cls} rounded-full border-gray-300 border-t-blue-600 animate-spin dark:border-gray-600 dark:border-t-blue-400`}
                        />
                        <span className="text-xs text-gray-400 dark:text-gray-500">{s.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
