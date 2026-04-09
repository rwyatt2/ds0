import type React from 'react';

export interface PricingTier { id: string; name: string; price: number | string; period?: string; description?: string; features: string[]; highlighted?: boolean; cta?: string; }
export interface UsePricingTableProps { tiers: PricingTier[]; onSelect?: (tier: PricingTier) => void; }
export interface UsePricingTableReturn { pricingTableProps: React.HTMLAttributes<HTMLDivElement>; }

export interface PricingTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'>, UsePricingTableProps { title?: string; }
export interface StyledPricingTableProps extends PricingTableProps { variant?: 'default' | 'cards' | 'minimal'; className?: string; }
