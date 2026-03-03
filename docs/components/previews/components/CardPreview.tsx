'use client';

const cards = [
    { variant: 'Default', cls: 'border bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800' },
    { variant: 'Outline', cls: 'border bg-transparent dark:border-gray-700' },
    { variant: 'Elevated', cls: 'border bg-white shadow-md dark:bg-gray-900 dark:border-gray-800' },
];

export function CardPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((c) => (
                <div key={c.variant} className={`rounded-lg overflow-hidden ${c.cls}`}>
                    <div className="p-4 pb-2">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{c.variant}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Card description text.</p>
                    </div>
                    <div className="px-4 py-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">Main content area.</p>
                    </div>
                    <div className="px-4 py-3 border-t dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Footer</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
