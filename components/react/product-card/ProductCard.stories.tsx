import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
const meta: Meta<typeof ProductCard> = { title: 'Recipes/Commerce/ProductCard', component: ProductCard, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof ProductCard>;
export const Default: Story = { args: { name: 'Premium Headphones', price: 299.99, description: 'Wireless noise-cancelling headphones', badge: 'New', rating: 4, onAddToCart: () => {} } };
export const Horizontal: Story = { args: { name: 'Smart Watch', price: 199, variant: 'horizontal', description: 'Track your fitness', rating: 5, onAddToCart: () => {} } };
export const Compact: Story = { args: { name: 'USB Cable', price: 9.99, variant: 'compact', onAddToCart: () => {} } };
