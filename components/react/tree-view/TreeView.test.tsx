import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TreeView } from './TreeView';
expect.extend(toHaveNoViolations);
const data = [{ key: '1', label: 'Root', children: [{ key: '1.1', label: 'Child' }] }];
describe('TreeView (Styled)', () => {
    it('renders', () => { render(<TreeView data={data} />); expect(screen.getByText('Root')).toBeInTheDocument(); });
    it('has tree role', () => { render(<TreeView data={data} />); expect(screen.getByRole('tree')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<TreeView data={data} />); expect(await axe(container)).toHaveNoViolations(); });
});
