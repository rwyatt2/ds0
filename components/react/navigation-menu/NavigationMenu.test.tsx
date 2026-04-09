import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NavigationMenu } from './NavigationMenu';
expect.extend(toHaveNoViolations);
describe('NavigationMenu (Styled)', () => {
    it('renders nav', () => { render(<NavigationMenu><NavigationMenu.List><NavigationMenu.Item><NavigationMenu.Link href="/">Home</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List></NavigationMenu>); expect(screen.getByRole('navigation')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<NavigationMenu><NavigationMenu.List><NavigationMenu.Item><NavigationMenu.Link href="/">Home</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List></NavigationMenu>); expect(await axe(container)).toHaveNoViolations(); });
});
