'use client';

import { ChevronRight, Home } from 'lucide-react';

export function BreadcrumbPreview(): React.ReactElement {
    const items = ['Home', 'Components', 'Breadcrumb'];

    return (
        <div className="w-full max-w-md">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-sm">
                    {items.map((item, i) => (
                        <li key={item} className="flex items-center gap-1.5">
                            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />}
                            {i === 0 ? (
                                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                                    <Home className="h-3.5 w-3.5" />
                                    {item}
                                </a>
                            ) : i < items.length - 1 ? (
                                <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                                    {item}
                                </a>
                            ) : (
                                <span className="text-gray-900 font-medium dark:text-gray-100">{item}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}
