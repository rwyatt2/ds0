import { render, screen } from '@testing-library/react';
import { KanbanBoard } from './KanbanBoard';
describe('KanbanBoard (Styled)', () => {
    it('renders', () => { render(<KanbanBoard columns={[{ id: '1', title: 'Col', items: [] }]} />); expect(screen.getByText('Col')).toBeInTheDocument(); });
});
