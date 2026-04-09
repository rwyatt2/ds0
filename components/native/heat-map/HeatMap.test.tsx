import { render } from '@testing-library/react-native';
import { HeatMap } from './HeatMap';
describe('HeatMap (Native)', () => { it('renders', () => { const { toJSON } = render(<HeatMap data={[[1,2],[3,4]]} />); expect(toJSON()).not.toBeNull(); }); });
