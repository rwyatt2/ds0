'use client';

import { ScrollArea } from '../../../../components/react/scroll-area';

const tags = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export function ScrollAreaPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Scrollable list (30 items)</p>
            <ScrollArea className="h-48 w-full rounded-md border">
                <div className="p-4">
                    {tags.map((tag) => (
                        <div key={tag} className="py-2 text-sm border-b last:border-b-0">
                            {tag}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
