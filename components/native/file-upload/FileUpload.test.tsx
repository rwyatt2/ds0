import { render } from '@testing-library/react-native';
import { FileUpload } from './FileUpload';
describe('FileUpload (Native)', () => { it('renders', () => { const { toJSON } = render(<FileUpload />); expect(toJSON()).toBeTruthy(); }); });
