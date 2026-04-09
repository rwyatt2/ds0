import type { Meta, StoryObj } from '@storybook/react';

import { EmptyState } from './EmptyState';

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'card'],
      description: 'Visual layout',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
    },
    title: {
      control: 'text',
      description: 'Headline text',
    },
    description: {
      control: 'text',
      description: 'Explanatory text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages',
    description: "You don't have any messages yet.",
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    title: 'No results',
    description: 'Try adjusting your filters.',
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
    icon: <InboxIcon />,
    title: 'No items',
    description: 'This collection is empty.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: <InboxIcon />,
    title: 'Empty',
    description: 'Nothing here yet.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    icon: <InboxIcon />,
    title: 'No projects found',
    description: 'Get started by creating your first project.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <PlusCircleIcon />,
    title: 'No projects',
    description: 'Get started by creating your first project.',
    action: <button className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Create Project</button>,
  },
};

export const NoIcon: Story = {
  args: {
    title: 'No results found',
    description: 'Try a different search term.',
  },
};
