'use client';

import { Cart } from '../../../../components/react/cart';

const cartItems = [
    { id: '1', name: 'Wireless Headphones', price: 79.99, quantity: 1, image: 'https://picsum.photos/seed/headphones/80/80' },
    { id: '2', name: 'Mechanical Keyboard', price: 149.99, quantity: 2, image: 'https://picsum.photos/seed/keyboard/80/80' },
    { id: '3', name: 'USB-C Hub', price: 34.99, quantity: 1, image: 'https://picsum.photos/seed/usbhub/80/80' },
];

export function CartPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <Cart
                items={cartItems}
                onUpdateQuantity={() => {}}
                onRemove={() => {}}
                onCheckout={() => {}}
            />
        </div>
    );
}
