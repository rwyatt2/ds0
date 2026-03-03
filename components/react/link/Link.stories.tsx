import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = { title: 'Components/Navigation/Link', component: Link, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'muted', 'underline'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = { args: { href: '#', children: 'Default Link' } };
export const Muted: Story = { args: { href: '#', variant: 'muted', children: 'Muted Link' } };
export const Underline: Story = { args: { href: '#', variant: 'underline', children: 'Underlined Link' } };
export const External: Story = { args: { href: 'https://example.com', isExternal: true, children: 'External Link' } };
export const Disabled: Story = { args: { href: '#', isDisabled: true, children: 'Disabled Link' } };

export const InlineParagraph: Story = {
    render: () => (
        <p className="text-sm text-muted-foreground max-w-md">
            By continuing, you agree to our <Link href="#">Terms of Service</Link> and{' '}
            <Link href="#">Privacy Policy</Link>.
        </p>
    ),
};
