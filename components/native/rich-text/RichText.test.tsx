import { render, screen } from '@testing-library/react-native';
import { RichText } from './RichText';
describe('RichText (Native)', () => { it('renders', () => { render(<RichText placeholder="Write..." />); expect(screen.getByLabelText('Rich text editor')).toBeTruthy(); }); });
