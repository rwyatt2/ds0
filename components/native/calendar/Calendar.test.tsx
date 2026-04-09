import { render } from '@testing-library/react-native';
import { Calendar } from './Calendar';
describe('Calendar (Native)', () => { it('renders', () => { const { toJSON } = render(<Calendar />); expect(toJSON()).not.toBeNull(); }); });
