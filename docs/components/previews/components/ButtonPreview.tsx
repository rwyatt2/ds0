'use client';

import { useState } from 'react';
import { Loader2, Plus, ArrowRight } from 'lucide-react';

const variants = [
    { name: 'primary', bg: 'bg-blue-600 text-white hover:bg-blue-700', label: 'Primary' },
    { name: 'secondary', bg: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700', label: 'Secondary' },
    { name: 'destructive', bg: 'bg-red-600 text-white hover:bg-red-700', label: 'Destructive' },
    { name: 'ghost', bg: 'bg-transparent text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800', label: 'Ghost' },
    { name: 'outline', bg: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-800', label: 'Outline' },
];

const sizes: Record<string, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
};

export function ButtonPreview(): React.ReactElement {
    const [loading, setLoading] = useState(false);

    return (
        <div className="w-full max-w-2xl space-y-6">
            {/* Variants */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <div className="flex flex-wrap items-center gap-3">
                    {variants.map((v) => (
                        <button
                            key={v.name}
                            className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${sizes.md} ${v.bg}`}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                        <button
                            key={s}
                            className={`inline-flex items-center justify-center rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors ${sizes[s]}`}
                        >
                            {s.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* States */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">States</p>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${sizes.md} bg-blue-600/50 text-white cursor-not-allowed`}
                    >
                        Disabled
                    </button>
                    <button
                        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
                        className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${sizes.md} bg-blue-600 text-white hover:bg-blue-700`}
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? 'Saving...' : 'Click to Load'}
                    </button>
                </div>
            </div>

            {/* With Icons */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">With Icons</p>
                <div className="flex flex-wrap items-center gap-3">
                    <button className={`inline-flex items-center justify-center gap-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors ${sizes.md}`}>
                        <Plus className="h-4 w-4" /> Add Item
                    </button>
                    <button className={`inline-flex items-center justify-center gap-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors ${sizes.md}`}>
                        Next Step <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
