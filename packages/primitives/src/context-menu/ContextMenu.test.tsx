import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { ContextMenuPrimitive, ContextMenuTriggerPrimitive, ContextMenuContentPrimitive, ContextMenuItemPrimitive } from './ContextMenu';

expect.extend(toHaveNoViolations);

const TestMenu = () => (
    <ContextMenuPrimitive>
        <ContextMenuTriggerPrimitive>Right click here</ContextMenuTriggerPrimitive>
        <ContextMenuContentPrimitive>
            <ContextMenuItemPrimitive>Copy</ContextMenuItemPrimitive>
            <ContextMenuItemPrimitive>Paste</ContextMenuItemPrimitive>
        </ContextMenuContentPrimitive>
    </ContextMenuPrimitive>
);

describe('ContextMenuPrimitive', () => {
    it('renders trigger', () => { render(<TestMenu />); expect(screen.getByText('Right click here')).toBeInTheDocument(); });
    it('hides content by default', () => { render(<TestMenu />); expect(screen.queryByRole('menu')).not.toBeInTheDocument(); });
    it('has no axe violations (closed)', async () => { const { container } = render(<TestMenu />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref on root', () => {
        const ref = createRef<HTMLDivElement>();
        render(<ContextMenuPrimitive ref={ref}><ContextMenuTriggerPrimitive>T</ContextMenuTriggerPrimitive><ContextMenuContentPrimitive><ContextMenuItemPrimitive>I</ContextMenuItemPrimitive></ContextMenuContentPrimitive></ContextMenuPrimitive>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
