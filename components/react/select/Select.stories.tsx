import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './index';

const meta: Meta<typeof Select> = { title: 'Components/Data Input/Select', component: Select, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    render: () => (
        <Select placeholder="Pick a fruit">
            <Select.Trigger className="w-[200px]" />
            <Select.Content>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
            </Select.Content>
        </Select>
    ),
};

export const WithGroups: Story = {
    render: () => (
        <Select placeholder="Select framework">
            <Select.Trigger className="w-[200px]" />
            <Select.Content>
                <Select.Group label="Frontend">
                    <Select.Item value="react">React</Select.Item>
                    <Select.Item value="vue">Vue</Select.Item>
                    <Select.Item value="svelte">Svelte</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group label="Backend">
                    <Select.Item value="express">Express</Select.Item>
                    <Select.Item value="fastify">Fastify</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select>
    ),
};

export const Disabled: Story = {
    render: () => (
        <Select placeholder="Disabled" isDisabled>
            <Select.Trigger className="w-[200px]" />
            <Select.Content><Select.Item value="a">A</Select.Item></Select.Content>
        </Select>
    ),
};
