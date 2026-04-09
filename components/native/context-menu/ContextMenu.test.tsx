import { render } from '@testing-library/react-native';
import { ContextMenu, ContextMenuTrigger } from './ContextMenu';
describe('ContextMenu (Native)', () => {
    it('renders trigger', () => { const { getByText } = render(<ContextMenu><ContextMenuTrigger>T</ContextMenuTrigger></ContextMenu>); expect(getByText('T')).toBeTruthy(); });
});
