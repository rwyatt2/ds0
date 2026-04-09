import { render, screen } from '@testing-library/react';
import { AvatarGroup } from './AvatarGroup';
describe('AvatarGroup (Styled)', () => { it('renders', () => { render(<AvatarGroup avatars={[{ id: '1', fallback: 'A' }]} />); expect(screen.getByRole('group')).toBeInTheDocument(); }); });
