'use client';

import { useState } from 'react';

export function TextAreaPreview(): React.ReactElement {
    const [value, setValue] = useState('');
    const maxLength = 200;

    return (
        <div className="w-full max-w-sm space-y-1.5">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Message</label>
            <textarea
                placeholder="Type your message..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={maxLength}
                rows={4}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <div className="flex justify-end">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                    {value.length}/{maxLength}
                </span>
            </div>
        </div>
    );
}
