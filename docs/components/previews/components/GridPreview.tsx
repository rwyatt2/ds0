'use client';

export function GridPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-4">
            {[2, 3, 4].map((cols) => (
                <div key={cols}>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{cols} Columns</p>
                    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                        {Array.from({ length: cols }).map((_, i) => (
                            <div key={i} className="h-12 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-mono text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
