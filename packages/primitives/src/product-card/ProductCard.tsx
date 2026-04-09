import { forwardRef } from 'react';
import type { ProductCardProps } from './ProductCard.types';
import { useProductCard } from './useProductCard';
const ProductCardPrimitive = forwardRef<HTMLDivElement, ProductCardProps>(({ name, price, image, description, badge, rating, onAddToCart, ...rest }, ref) => {
    const { productCardProps } = useProductCard();
    return (<div ref={ref} {...rest} {...productCardProps}>{image && <img src={image} alt={name} />}{badge && <span>{badge}</span>}<h3>{name}</h3>{description && <p>{description}</p>}<p>{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</p>{onAddToCart && <button onClick={onAddToCart}>Add to Cart</button>}</div>);
});
ProductCardPrimitive.displayName = 'ProductCardPrimitive';
export { ProductCardPrimitive };
