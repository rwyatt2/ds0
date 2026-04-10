'use client';

import { MasonryGrid } from '../../../../components/react/masonry-grid';

const heights = [120, 180, 100, 150, 200, 130, 160, 110, 190];

export function MasonryGridPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <MasonryGrid columns={3} gap={12}>
                {heights.map((h, i) => (
                    <div
                        key={i}
                        className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border flex items-center justify-center text-xs font-medium text-muted-foreground"
                        style={{ height: h }}
                    >
                        {h}px
                    </div>
                ))}
            </MasonryGrid>
        </div>
    );
}
