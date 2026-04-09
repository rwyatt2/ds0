import type { Meta, StoryObj } from '@storybook/react';

import { BackToTop } from './BackToTop';

const meta: Meta<typeof BackToTop> = {
  title: 'Components/Navigation/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
      description: 'The visual style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size',
    },
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'bottom-center'],
      description: 'Screen position',
    },
    threshold: {
      control: 'number',
      description: 'Scroll distance (px) before appearing',
    },
    smooth: {
      control: 'boolean',
      description: 'Use smooth scrolling',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', position: 'relative' }}>
        <div style={{ padding: '2rem' }}>
          <p>Scroll down to see the BackToTop button appear.</p>
          <div style={{ height: '150vh' }} />
          <p>You should see the button now!</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

export const Default: Story = {
  args: {
    isVisible: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    isVisible: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    isVisible: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    isVisible: true,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    isVisible: true,
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    isVisible: true,
  },
};

export const BottomCenter: Story = {
  args: {
    position: 'bottom-center',
    isVisible: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    isVisible: true,
  },
};

export const CustomThreshold: Story = {
  args: {
    threshold: 500,
  },
};
