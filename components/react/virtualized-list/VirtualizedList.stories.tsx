import type { Meta, StoryObj } from '@storybook/react';
import { VirtualizedList } from './VirtualizedList';
const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: `Item ${i + 1}` }));
const meta: Meta = { title: 'Components/Layout/VirtualizedList', tags: ['autodocs'] };
export default meta;
export const Default: StoryObj = {
  render: () => (<VirtualizedList items={items} itemHeight={40} height={400} renderItem={(item: { id: number; label: string }) => <div className="flex items-center px-4 h-10 border-b border-border hover:bg-accent text-sm">{item.label}</div>} />),
};
