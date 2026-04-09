import type { Meta, StoryObj } from '@storybook/react';
import { Cart } from './Cart';
const meta: Meta<typeof Cart> = { title: 'Recipes/Commerce/Cart', component: Cart, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Cart>;
const items = [{ id: '1', name: 'Wireless Headphones', price: 79.99, quantity: 1 }, { id: '2', name: 'Phone Case', price: 19.99, quantity: 2 }];
export const Default: Story = { args: { items, onUpdateQuantity: () => {}, onRemove: () => {}, onCheckout: () => {} } };
export const Empty: Story = { args: { items: [], onCheckout: () => {} } };
export const Sidebar: Story = { args: { items, variant: 'sidebar', onCheckout: () => {} } };
