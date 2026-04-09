import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteScroll } from './InfiniteScroll';
const meta: Meta<typeof InfiniteScroll> = { title: 'Components/Layout/InfiniteScroll', component: InfiniteScroll, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof InfiniteScroll>;
export const Default: Story = { args: { hasMore: true, isLoading: false, onLoadMore: () => console.log('load more'), children: Array.from({ length: 20 }, (_, i) => <div key={i} className="p-4 border-b">{`Item ${i + 1}`}</div>) } };
export const Loading: Story = { args: { hasMore: true, isLoading: true, onLoadMore: () => {}, children: <div className="p-4">Content</div> } };
export const End: Story = { args: { hasMore: false, isLoading: false, onLoadMore: () => {}, children: <div className="p-4">All loaded</div> } };
