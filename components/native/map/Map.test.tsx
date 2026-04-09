import { render } from '@testing-library/react-native';
import { Map } from './Map';
describe('Map (Native)', () => { it('renders', () => { const { toJSON } = render(<Map />); expect(toJSON()).not.toBeNull(); }); });
