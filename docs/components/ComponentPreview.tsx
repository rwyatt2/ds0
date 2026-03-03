'use client';

import { useState, type ReactNode } from 'react';
import { useDensity } from './DensityProvider';

interface ComponentPreviewProps {
    children: ReactNode;
    code?: string;
    className?: string;
}

export function ComponentPreview({
    children,
    code,
    className,
}: ComponentPreviewProps): React.ReactElement {
    const [showCode, setShowCode] = useState(false);
    const { density, toggleDensity } = useDensity();

    return (
        <div
            className={`my-6 rounded-lg border ${className ?? ''}`}
            data-density={density}
        >
            {/* Density toggle */}
            <div className="flex items-center justify-end px-3 py-1.5 border-b border-gray-100 dark:border-gray-800">
                <div className="inline-flex rounded-md border border-gray-200 dark:border-gray-700 text-[11px] font-medium">
                    <button
                        type="button"
                        onClick={() => toggleDensity()}
                        className={`px-2 py-1 rounded-l-md transition-colors ${density === 'normal'
                                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        Normal
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleDensity()}
                        className={`px-2 py-1 rounded-r-md transition-colors ${density === 'dense'
                                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        Dense
                    </button>
                </div>
            </div>

            {/* Preview area */}
            <div
                className="ds0-preview-area flex min-h-[150px] items-center justify-center p-8"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, hsl(var(--fd-border)) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
            >
                <div className="ds0-preview-content w-full flex items-center justify-center">
                    {children}
                </div>
            </div>

            {/* Code toggle */}
            {code && (
                <>
                    <div className="border-t px-4 py-2">
                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="text-xs font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                        >
                            {showCode ? 'Hide Code' : 'View Code'}
                        </button>
                    </div>

                    {showCode && (
                        <div className="border-t">
                            <pre className="overflow-x-auto p-4 text-sm">
                                <code>{code}</code>
                            </pre>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
