'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PaginationPreview(): React.ReactElement {
    const [page, setPage] = useState(3);
    const total = 10;

    const pages = [1, 2, 3, 4, 5];

    return (
        <div className="w-full max-w-md flex justify-center">
            <nav className="flex items-center gap-1" aria-label="Pagination">
                <button
                    type="button"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                {pages.map((p) => (
                    <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${page === p
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                    >
                        {p}
                    </button>
                ))}
                <span className="px-1 text-gray-400">…</span>
                <button
                    type="button"
                    onClick={() => setPage(total)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${page === total
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                >
                    {total}
                </button>
                <button
                    type="button"
                    onClick={() => setPage(Math.min(total, page + 1))}
                    disabled={page >= total}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </nav>
        </div>
    );
}
