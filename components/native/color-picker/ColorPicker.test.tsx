import { render } from '@testing-library/react-native';
import { ColorPicker } from './ColorPicker';
describe('ColorPicker (Native)', () => { it('renders', () => { const { toJSON } = render(<ColorPicker value="#FF0000" />); expect(toJSON()).toBeTruthy(); }); });
