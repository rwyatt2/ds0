'use client';

export function TextPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-4">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <div className="space-y-2">
                    {[
                        { name: 'xs', px: '12px' },
                        { name: 'sm', px: '14px' },
                        { name: 'base', px: '16px' },
                        { name: 'lg', px: '18px' },
                        { name: 'xl', px: '20px' },
                    ].map((s) => (
                        <div key={s.name} className="flex items-baseline gap-3">
                            <span className="w-10 text-right text-xs font-mono text-gray-400 dark:text-gray-500 shrink-0">{s.name}</span>
                            <span className="text-gray-900 dark:text-gray-100" style={{ fontSize: s.px }}>
                                The quick brown fox jumps over the lazy dog
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Colors</p>
                <div className="space-y-1">
                    <p className="text-sm text-gray-900 dark:text-gray-100">Default foreground</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Muted foreground</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Primary color</p>
                    <p className="text-sm text-red-600 dark:text-red-400">Destructive color</p>
                </div>
            </div>
        </div>
    );
}
