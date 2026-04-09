import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MenubarPrimitive, MenubarMenuPrimitive, MenubarTriggerPrimitive, MenubarContentPrimitive, MenubarItemPrimitive } from './Menubar';
expect.extend(toHaveNoViolations);
const TestMenubar = () => (
    <MenubarPrimitive>
        <MenubarMenuPrimitive><MenubarTriggerPrimitive>File</MenubarTriggerPrimitive><MenubarContentPrimitive><MenubarItemPrimitive>New</MenubarItemPrimitive><MenubarItemPrimitive>Open</MenubarItemPrimitive></MenubarContentPrimitive></MenubarMenuPrimitive>
    </MenubarPrimitive>
);
describe('MenubarPrimitive', () => {
    it('renders with role=menubar', () => { render(<TestMenubar />); expect(screen.getByRole('menubar')).toBeInTheDocument(); });
    it('renders trigger', () => { render(<TestMenubar />); expect(screen.getByRole('button', { name: 'File' })).toBeInTheDocument(); });
    it('opens menu on click', async () => { const user = userEvent.setup(); render(<TestMenubar />); await user.click(screen.getByRole('button', { name: 'File' })); expect(screen.getByRole('menu')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<TestMenubar />); expect(await axe(container)).toHaveNoViolations(); });
});
