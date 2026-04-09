import { render } from '@testing-library/react-native';
import { CommandPalette } from './CommandPalette';
describe('CommandPalette (Native)', () => { it('renders when open', () => { const { toJSON } = render(<CommandPalette items={[{ id: '1', label: 'T' }]} open />); expect(toJSON()).not.toBeNull(); }); });
