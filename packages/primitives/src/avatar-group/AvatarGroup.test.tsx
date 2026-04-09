import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AvatarGroupPrimitive } from './AvatarGroup';
expect.extend(toHaveNoViolations);
const avatars = [{ id: '1', fallback: 'A' }, { id: '2', fallback: 'B' }];
describe('AvatarGroupPrimitive', () => {
    it('renders', () => { render(<AvatarGroupPrimitive avatars={avatars} />); expect(screen.getByRole('group')).toBeInTheDocument(); });
    it('shows overflow', () => { render(<AvatarGroupPrimitive avatars={avatars} max={1} />); expect(screen.getByText('+1')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<AvatarGroupPrimitive avatars={avatars} />); expect(await axe(container)).toHaveNoViolations(); });
});
