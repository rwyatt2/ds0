'use client';

import { InfiniteScroll } from '../../../../components/react/infinite-scroll';

export function InfiniteScrollPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm border rounded-lg overflow-hidden h-48">
            <InfiniteScroll hasMore={false} isLoading={false} onLoadMore={() => {}} endMessage="All items loaded">
                {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="px-4 py-3 border-b text-sm">
                        Item {i + 1}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}
