import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Menubar } from './Menubar';
expect.extend(toHaveNoViolations);
describe('Menubar (Styled)', () => {
    it('renders menubar', () => { render(<Menubar><Menubar.Menu><Menubar.Trigger>File</Menubar.Trigger><Menubar.Content><Menubar.Item>New</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar>); expect(screen.getByRole('menubar')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Menubar><Menubar.Menu><Menubar.Trigger>File</Menubar.Trigger><Menubar.Content><Menubar.Item>New</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar>); expect(await axe(container)).toHaveNoViolations(); });
});
