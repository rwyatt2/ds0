'use client';

import { ExternalLink } from 'lucide-react';

export function LinkPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md space-y-4">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <div className="flex flex-wrap items-center gap-4">
                    <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400" onClick={(e) => e.preventDefault()}>
                        Default Link
                    </a>
                    <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400 inline-flex items-center gap-1" onClick={(e) => e.preventDefault()}>
                        External <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="text-sm text-gray-400 cursor-not-allowed dark:text-gray-600">
                        Disabled
                    </span>
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">In Context</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Read our{' '}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400" onClick={(e) => e.preventDefault()}>
                        documentation
                    </a>{' '}
                    to learn more about getting started.
                </p>
            </div>
        </div>
    );
}
