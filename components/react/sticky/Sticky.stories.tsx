import type { Meta, StoryObj } from '@storybook/react';

import { Sticky } from './Sticky';

const meta: Meta<typeof Sticky> = {
  title: 'Components/Layout/Sticky',
  component: Sticky,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Edge to stick to',
    },
    offset: {
      control: 'number',
      description: 'Offset from edge in pixels',
    },
    shadow: {
      control: 'boolean',
      description: 'Show shadow when stuck',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', position: 'relative' }}>
        <div style={{ height: '100px', padding: '2rem' }}>
          <p>Scroll down to see the sticky behavior.</p>
        </div>
        <Story />
        <div style={{ height: '150vh', padding: '2rem' }}>
          <p>Keep scrolling — the element above should now be stuck.</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sticky>;

export const Default: Story = {
  args: {
    children: (
      <div className="px-4 py-3 border-b bg-background">
        <strong>Sticky Toolbar</strong> — This pins to the top when you scroll.
      </div>
    ),
  },
};

export const WithShadow: Story = {
  args: {
    shadow: true,
    children: (
      <div className="px-4 py-3 bg-background">
        <strong>Shadow on Stuck</strong> — Watch for the shadow effect.
      </div>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    shadow: false,
    children: (
      <div className="px-4 py-3 border-b bg-background">
        <strong>No Shadow</strong> — Clean sticky without shadow.
      </div>
    ),
  },
};

export const WithOffset: Story = {
  args: {
    offset: 64,
    children: (
      <div className="px-4 py-3 border-b bg-background">
        <strong>Offset 64px</strong> — Sticks below a header.
      </div>
    ),
  },
};

export const AsHeader: Story = {
  args: {
    as: 'header',
    children: (
      <div className="px-4 py-3 border-b bg-background">
        <strong>Header Element</strong> — Rendered as a semantic header.
      </div>
    ),
  },
};
