import type React from 'react';
export interface CartItem { id: string; name: string; price: number; quantity: number; image?: string; }
export interface UseCartProps { items: CartItem[]; onUpdateQuantity?: (id: string, qty: number) => void; onRemove?: (id: string) => void; onCheckout?: () => void; }
export interface UseCartReturn { cartProps: React.HTMLAttributes<HTMLDivElement>; total: number; itemCount: number; }
export interface CartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseCartProps { title?: string; }
export interface StyledCartProps extends CartProps { variant?: 'default' | 'sidebar' | 'compact'; className?: string; }
