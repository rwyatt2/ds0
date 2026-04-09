import type { Meta, StoryObj } from '@storybook/react';
import { Tour } from './Tour';
const meta: Meta<typeof Tour> = { title: 'Recipes/Commerce/Tour', component: Tour, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Tour>;
const steps = [{ id: '1', title: 'Welcome!', content: 'This is your new dashboard.' }, { id: '2', title: 'Navigation', content: 'Use the sidebar to navigate.' }, { id: '3', title: 'Settings', content: 'Customize your experience here.' }];
export const Default: Story = { args: { steps, active: true, onComplete: () => {}, onSkip: () => {} } };
