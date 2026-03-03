'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const items = [
    { title: 'Getting Started', content: 'Install DS0 with your package manager and import the tokens.' },
    { title: 'Customization', content: 'Override semantic tokens in your theme file to match your brand.' },
    { title: 'Accessibility', content: 'All components follow WAI-ARIA patterns with keyboard navigation.' },
];

export function AccordionPreview(): React.ReactElement {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="w-full max-w-md divide-y border rounded-lg dark:border-gray-700 dark:divide-gray-700">
            {items.map((item, i) => (
                <div key={i}>
                    <button
                        type="button"
                        onClick={() => setOpen(open === i ? null : i)}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors dark:text-gray-100 dark:hover:bg-gray-800/50"
                    >
                        {item.title}
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                    </button>
                    {open === i && (
                        <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
