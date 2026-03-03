import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Avatar } from './Avatar';

expect.extend(toHaveNoViolations);

describe('Avatar (Styled)', () => {
    it('renders fallback initials', () => { render(<Avatar alt="John Doe" fallback="JD" />); expect(screen.getByText('JD')).toBeInTheDocument(); });
    it('applies size classes', () => { const { container } = render(<Avatar alt="Test" fallback="T" size="lg" />); expect(container.firstChild).toHaveClass('h-12'); });
    it('applies shape classes', () => { const { container } = render(<Avatar alt="Test" fallback="T" shape="square" />); expect(container.firstChild).toHaveClass('rounded-md'); });
    it('has no axe violations', async () => { const { container } = render(<Avatar alt="John" fallback="JD" />); expect(await axe(container)).toHaveNoViolations(); });
});
