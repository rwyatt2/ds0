import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { KanbanBoardPrimitive } from './KanbanBoard';
expect.extend(toHaveNoViolations);
const cols = [{ id: '1', title: 'Todo', items: [{ id: 'a', title: 'Task A' }] }, { id: '2', title: 'Done', items: [] }];
describe('KanbanBoardPrimitive', () => {
    it('renders columns', () => { render(<KanbanBoardPrimitive columns={cols} />); expect(screen.getByText(/Todo/)).toBeInTheDocument(); expect(screen.getByText('Task A')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<KanbanBoardPrimitive columns={cols} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<KanbanBoardPrimitive ref={ref} columns={cols} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
