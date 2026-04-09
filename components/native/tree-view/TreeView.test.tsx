import { render, screen } from '@testing-library/react-native';
import { TreeView } from './TreeView';
describe('TreeView (Native)', () => { it('renders', () => { render(<TreeView data={[{ key: '1', label: 'Folder' }]} />); expect(screen.getByText('Folder')).toBeTruthy(); }); });
