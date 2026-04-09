import { render } from '@testing-library/react-native';
import { KanbanBoard } from './KanbanBoard';
describe('KanbanBoard (Native)', () => { it('renders', () => { const { toJSON } = render(<KanbanBoard columns={[{ id: '1', title: 'Col', items: [] }]} />); expect(toJSON()).not.toBeNull(); }); });
