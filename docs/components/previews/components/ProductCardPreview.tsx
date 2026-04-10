'use client';

import { ProductCard } from '../../../../components/react/product-card';
import { Stack } from '../../../../components/react/stack';

export function ProductCardPreview(): React.ReactElement {
    return (
        <Stack direction="horizontal" gap="4" className="w-full flex-wrap">
            <ProductCard
                name="Wireless Headphones"
                price={79.99}
                image="https://picsum.photos/seed/headphones/300/300"
                badge="New"
                rating={4}
                description="Premium noise-cancelling over-ear headphones"
                onAddToCart={() => {}}
                className="flex-1 min-w-[200px] max-w-[260px]"
            />
            <ProductCard
                name="Mechanical Keyboard"
                price={149.99}
                image="https://picsum.photos/seed/keyboard/300/300"
                badge="Sale"
                rating={5}
                description="Cherry MX switches, RGB backlit"
                onAddToCart={() => {}}
                className="flex-1 min-w-[200px] max-w-[260px]"
            />
        </Stack>
    );
}
