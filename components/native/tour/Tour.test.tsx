import { render } from '@testing-library/react-native';
import { Tour } from './Tour';
describe('Tour (Native)', () => { it('renders', () => { const { toJSON } = render(<Tour steps={[{ id: '1', title: 'Hi', content: 'X' }]} active />); expect(toJSON()).not.toBeNull(); }); });
