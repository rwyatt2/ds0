'use client';

export function ProgressPreview(): React.ReactElement {
    const bars = [
        { label: 'Default', value: 50, color: 'bg-blue-600' },
        { label: 'Success', value: 100, color: 'bg-green-600' },
        { label: 'Warning', value: 80, color: 'bg-amber-500' },
        { label: 'Destructive', value: 90, color: 'bg-red-600' },
    ];

    return (
        <div className="w-full max-w-md space-y-4">
            {bars.map((b) => (
                <div key={b.label} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{b.label}</span>
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{b.value}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                            className={`h-full rounded-full ${b.color} transition-all`}
                            style={{ width: `${b.value}%` }}
                        />
                    </div>
                </div>
            ))}
            <div className="space-y-1.5">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Indeterminate</span>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full w-1/3 rounded-full bg-blue-600 animate-[indeterminate_1.5s_ease-in-out_infinite]" />
                </div>
            </div>
            <style>{`@keyframes indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
        </div>
    );
}
