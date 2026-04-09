import { useMemo } from 'react';
import type { UseCartProps, UseCartReturn } from './Cart.types';
export function useCart(props: UseCartProps): UseCartReturn {
    const { items } = props;
    const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
    const itemCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
    return { cartProps: { role: 'region', 'aria-label': `Shopping cart with ${itemCount} items` }, total, itemCount };
}
