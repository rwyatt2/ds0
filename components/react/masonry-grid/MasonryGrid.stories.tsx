import type { Meta, StoryObj } from '@storybook/react';
import { MasonryGrid } from './MasonryGrid';
const meta: Meta<typeof MasonryGrid> = { title: 'Components/Layout/MasonryGrid', component: MasonryGrid, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof MasonryGrid>;
const items = [120, 200, 160, 240, 180, 140, 220, 190, 170].map((h, i) => <div key={i} style={{ height: h, background: `hsl(${i * 40}, 70%, 85%)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>);
export const Default: Story = { args: { columns: 3, gap: 16, children: items } };
export const TwoColumns: Story = { args: { columns: 2, gap: 12, children: items } };
export const FourColumns: Story = { args: { columns: 4, gap: 8, children: items } };
