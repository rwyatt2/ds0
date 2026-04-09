import { render } from '@testing-library/react-native';
import { JsonViewer } from './JsonViewer';
describe('JsonViewer (Native)', () => { it('renders', () => { const { toJSON } = render(<JsonViewer data={{ a: 1 }} />); expect(toJSON()).not.toBeNull(); }); });
