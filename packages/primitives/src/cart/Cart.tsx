import { forwardRef } from 'react';
import type { CartProps } from './Cart.types';
import { useCart } from './useCart';
const CartPrimitive = forwardRef<HTMLDivElement, CartProps>(({ items, onUpdateQuantity, onRemove, onCheckout, title, ...rest }, ref) => {
    const { cartProps, total, itemCount } = useCart({ items, onUpdateQuantity, onRemove, onCheckout });
    return (<div ref={ref} {...rest} {...cartProps}>{title && <h2>{title}</h2>}{items.map(i => <div key={i.id}><span>{i.name}</span><span>×{i.quantity}</span><span>${(i.price * i.quantity).toFixed(2)}</span>{onRemove && <button onClick={() => onRemove(i.id)}>Remove</button>}</div>)}<div>Total: ${total.toFixed(2)}</div>{onCheckout && <button onClick={onCheckout}>Checkout</button>}</div>);
});
CartPrimitive.displayName = 'CartPrimitive';
export { CartPrimitive };
