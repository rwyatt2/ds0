import type React from 'react';
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> { name: string; price: number | string; image?: string; description?: string; badge?: string; rating?: number; onAddToCart?: () => void; }
export interface StyledProductCardProps extends ProductCardProps { variant?: 'default' | 'horizontal' | 'compact'; className?: string; }
