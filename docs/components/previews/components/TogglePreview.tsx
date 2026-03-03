'use client';

import { useState } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

export function TogglePreview(): React.ReactElement {
    const [pressed, setPressed] = useState(true);

    return (
        <div className="w-full max-w-sm space-y-4">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Single Toggle</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        aria-pressed={pressed}
                        onClick={() => setPressed(!pressed)}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors ${pressed
                                ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                                : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                            }`}
                    >
                        <Bold className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-pressed={false}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    >
                        <Italic className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-pressed={false}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    >
                        <Underline className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
