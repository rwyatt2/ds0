'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export function TooltipPreview(): React.ReactElement {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const items = [
        { label: 'Hover me', tip: 'This is a tooltip' },
        { label: 'Or me', tip: 'Another helpful hint' },
    ];

    return (
        <div className="w-full max-w-sm flex items-center gap-6 justify-center">
            {items.map((item, i) => (
                <div key={i} className="relative">
                    <button
                        type="button"
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                        <HelpCircle className="h-4 w-4" />
                        {item.label}
                    </button>
                    {hoveredIdx === i && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap shadow-lg dark:bg-gray-100 dark:text-gray-900">
                            {item.tip}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
