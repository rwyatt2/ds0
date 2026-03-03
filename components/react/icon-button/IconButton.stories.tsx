import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>);
const XIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>);

const meta: Meta<typeof IconButton> = {
    title: 'Components/Actions/IconButton', component: IconButton, tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary', 'destructive', 'ghost', 'outline'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search' } };
export const Primary: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search', variant: 'primary' } };
export const Outline: Story = { args: { icon: <XIcon />, 'aria-label': 'Close', variant: 'outline' } };
export const Loading: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search', isLoading: true } };
export const Disabled: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search', isDisabled: true } };
export const Small: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search', size: 'sm' } };
export const Large: Story = { args: { icon: <SearchIcon />, 'aria-label': 'Search', size: 'lg' } };
