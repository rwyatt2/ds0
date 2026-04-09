import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NavigationMenuPrimitive, NavigationMenuListPrimitive, NavigationMenuItemPrimitive, NavigationMenuLinkPrimitive } from './NavigationMenu';
expect.extend(toHaveNoViolations);
describe('NavigationMenuPrimitive', () => {
    it('renders navigation element', () => { render(<NavigationMenuPrimitive><NavigationMenuListPrimitive><NavigationMenuItemPrimitive><NavigationMenuLinkPrimitive href="/">Home</NavigationMenuLinkPrimitive></NavigationMenuItemPrimitive></NavigationMenuListPrimitive></NavigationMenuPrimitive>); expect(screen.getByRole('navigation')).toBeInTheDocument(); });
    it('renders links', () => { render(<NavigationMenuPrimitive><NavigationMenuListPrimitive><NavigationMenuItemPrimitive><NavigationMenuLinkPrimitive href="/">Home</NavigationMenuLinkPrimitive></NavigationMenuItemPrimitive></NavigationMenuListPrimitive></NavigationMenuPrimitive>); expect(screen.getByText('Home')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<NavigationMenuPrimitive><NavigationMenuListPrimitive><NavigationMenuItemPrimitive><NavigationMenuLinkPrimitive href="/">Home</NavigationMenuLinkPrimitive></NavigationMenuItemPrimitive></NavigationMenuListPrimitive></NavigationMenuPrimitive>); expect(await axe(container)).toHaveNoViolations(); });
});
