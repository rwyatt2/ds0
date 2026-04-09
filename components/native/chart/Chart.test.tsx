import { render } from '@testing-library/react-native';
import { Chart } from './Chart';
describe('Chart (Native)', () => { it('renders', () => { const { toJSON } = render(<Chart labels={['A']} datasets={[{ label: 'T', data: [1] }]} />); expect(toJSON()).not.toBeNull(); }); });
