'use client';

import { useState } from 'react';

export function TextFieldPreview(): React.ReactElement {
    const [value, setValue] = useState('');

    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Default</label>
                <input
                    type="text"
                    placeholder="Enter your name..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">With Error</label>
                <input
                    type="email"
                    value="invalid-email"
                    readOnly
                    className="h-10 w-full rounded-md border border-red-500 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:bg-gray-900 dark:text-gray-100"
                />
                <p className="text-xs text-red-500">Please enter a valid email address.</p>
            </div>
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 dark:text-gray-600">Disabled</label>
                <input
                    type="text"
                    disabled
                    placeholder="Cannot edit..."
                    className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600"
                />
            </div>
        </div>
    );
}
