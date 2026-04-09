import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact', 'floating'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    side: { control: 'select', options: ['left', 'right'] },
    collapsible: { control: 'boolean' },
  },
  decorators: [(Story) => <div style={{ display: 'flex', height: '400px', border: '1px solid #e5e7eb' }}><Story /><div style={{ flex: 1, padding: '1rem' }}>Main Content</div></div>],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const NavItems = () => (
  <>
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent">📊 Dashboard</a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent">👤 Users</a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent">⚙️ Settings</a>
  </>
);

export const Default: Story = { args: { children: <NavItems />, header: <span className="font-bold text-sm">DS0 App</span> } };
export const Compact: Story = { args: { variant: 'compact', children: <NavItems /> } };
export const Floating: Story = { args: { variant: 'floating', children: <NavItems /> } };
export const Collapsed: Story = { args: { defaultCollapsed: true, children: <NavItems />, header: <span className="font-bold text-sm">DS0</span> } };
export const RightSide: Story = { args: { side: 'right', children: <NavItems /> }, decorators: [(Story) => <div style={{ display: 'flex', height: '400px', border: '1px solid #e5e7eb' }}><div style={{ flex: 1, padding: '1rem' }}>Main Content</div><Story /></div>] };
export const NonCollapsible: Story = { args: { collapsible: false, children: <NavItems /> } };
