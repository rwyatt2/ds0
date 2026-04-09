import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';

const meta: Meta<typeof AppShell> = {
  title: 'Components/Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'fixed-header', 'fixed-sidebar'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

const Header = () => <div className="px-6 py-3 font-bold">DS0 App</div>;
const Footer = () => <div className="px-6 py-3 text-sm text-muted-foreground">© 2026 DS0</div>;
const SidebarContent = () => (
  <nav className="w-64 border-r p-4"><a href="#">Dashboard</a><br /><a href="#">Settings</a></nav>
);

export const Default: Story = {
  args: { header: <Header />, footer: <Footer />, children: <div><h1 className="text-xl font-bold">Dashboard</h1><p>Welcome to the dashboard.</p></div> },
};

export const WithSidebar: Story = {
  args: { header: <Header />, sidebar: <SidebarContent />, children: <div><h1 className="text-xl font-bold">Content</h1></div> },
};

export const FixedHeader: Story = {
  args: { variant: 'fixed-header', header: <Header />, children: <div style={{ height: '200vh' }}><p>Scroll to see the fixed header.</p></div> },
};

export const NoPadding: Story = {
  args: { padding: 'none', header: <Header />, children: <div className="bg-muted h-64">Full-bleed content</div> },
};
