import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContextMenu } from './ContextMenu';
expect.extend(toHaveNoViolations);
describe('ContextMenu (Styled)', () => {
    it('renders trigger', () => { render(<ContextMenu><ContextMenu.Trigger>Right click</ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Item>Copy</ContextMenu.Item></ContextMenu.Content></ContextMenu>); expect(screen.getByText('Right click')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<ContextMenu><ContextMenu.Trigger>T</ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Item>I</ContextMenu.Item></ContextMenu.Content></ContextMenu>); expect(await axe(container)).toHaveNoViolations(); });
});
