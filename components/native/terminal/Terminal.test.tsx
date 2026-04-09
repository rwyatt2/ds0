import { render } from '@testing-library/react-native';
import { Terminal } from './Terminal';
describe('Terminal (Native)', () => { it('renders', () => { const { toJSON } = render(<Terminal lines={[{ type: 'output', content: 'hi' }]} />); expect(toJSON()).not.toBeNull(); }); });
