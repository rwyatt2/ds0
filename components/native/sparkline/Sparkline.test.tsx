import { render } from '@testing-library/react-native';
import { Sparkline } from './Sparkline';
describe('Sparkline (Native)', () => { it('renders', () => { const { toJSON } = render(<Sparkline data={[1,2,3]} />); expect(toJSON()).not.toBeNull(); }); });
