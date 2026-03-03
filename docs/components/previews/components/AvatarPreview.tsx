'use client';

export function AvatarPreview(): React.ReactElement {
    const sizes = [
        { name: 'sm', cls: 'h-8 w-8 text-xs' },
        { name: 'md', cls: 'h-10 w-10 text-sm' },
        { name: 'lg', cls: 'h-12 w-12 text-base' },
    ];

    return (
        <div className="w-full max-w-md space-y-4">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">With Initials</p>
                <div className="flex items-center gap-3">
                    {sizes.map((s) => (
                        <div
                            key={s.name}
                            className={`${s.cls} inline-flex items-center justify-center rounded-full bg-blue-600 text-white font-medium`}
                        >
                            JD
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Fallback</p>
                <div className="flex items-center gap-3">
                    {sizes.map((s) => (
                        <div
                            key={s.name}
                            className={`${s.cls} inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium dark:bg-gray-700 dark:text-gray-300`}
                        >
                            ?
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Group</p>
                <div className="flex -space-x-2">
                    {['AC', 'BK', 'CL', 'DM', '+3'].map((init, i) => (
                        <div
                            key={i}
                            className={`h-10 w-10 inline-flex items-center justify-center rounded-full border-2 border-white text-sm font-medium dark:border-gray-900 ${i < 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {init}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
