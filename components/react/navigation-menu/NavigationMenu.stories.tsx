import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './NavigationMenu';
const meta: Meta<typeof NavigationMenu> = { title: 'Components/Navigation/NavigationMenu', component: NavigationMenu, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof NavigationMenu>;
export const Default: Story = {
    render: () => (
        <NavigationMenu>
            <NavigationMenu.List>
                <NavigationMenu.Item value="products"><NavigationMenu.Trigger>Products</NavigationMenu.Trigger><NavigationMenu.Content><div className="p-4 w-64"><NavigationMenu.Link href="/product-a">Product A</NavigationMenu.Link><NavigationMenu.Link href="/product-b">Product B</NavigationMenu.Link></div></NavigationMenu.Content></NavigationMenu.Item>
                <NavigationMenu.Item><NavigationMenu.Link href="/about">About</NavigationMenu.Link></NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu>
    ),
};
