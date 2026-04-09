import { render } from '@testing-library/react-native';
import { Changelog } from './Changelog';
describe('Changelog (Native)', () => { it('renders', () => { const { toJSON } = render(<Changelog entries={[{ id: '1', version: '1.0', date: '2024', title: 'Init', type: 'feature' }]} />); expect(toJSON()).not.toBeNull(); }); });
