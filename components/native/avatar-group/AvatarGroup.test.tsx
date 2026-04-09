import { render } from '@testing-library/react-native';
import { AvatarGroup } from './AvatarGroup';
describe('AvatarGroup (Native)', () => { it('renders', () => { const { toJSON } = render(<AvatarGroup avatars={[{ id: '1', fallback: 'A' }]} />); expect(toJSON()).not.toBeNull(); }); });
