import { render } from '@testing-library/react-native';
import { DiffViewer } from './DiffViewer';
describe('DiffViewer (Native)', () => { it('renders', () => { const { toJSON } = render(<DiffViewer oldValue="a" newValue="b" />); expect(toJSON()).not.toBeNull(); }); });
