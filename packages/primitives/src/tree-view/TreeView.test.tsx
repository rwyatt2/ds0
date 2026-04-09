import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TreeViewPrimitive } from './TreeView';
expect.extend(toHaveNoViolations);
const data = [{ key: '1', label: 'Folder', children: [{ key: '1.1', label: 'File.txt' }] }, { key: '2', label: 'Other' }];
describe('TreeViewPrimitive', () => {
    it('renders nodes', () => { render(<TreeViewPrimitive data={data} />); expect(screen.getByText('Folder')).toBeInTheDocument(); expect(screen.getByText('Other')).toBeInTheDocument(); });
    it('has tree role', () => { render(<TreeViewPrimitive data={data} />); expect(screen.getByRole('tree')).toBeInTheDocument(); });
    it('expands on click', async () => { const user = userEvent.setup(); render(<TreeViewPrimitive data={data} />); await user.click(screen.getByText('Folder')); expect(screen.getByText('File.txt')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<TreeViewPrimitive data={data} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<TreeViewPrimitive ref={ref} data={data} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
