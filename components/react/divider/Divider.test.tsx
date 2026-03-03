import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Divider } from './Divider';
expect.extend(toHaveNoViolations);
describe('Divider (Styled)', () => {
    it('renders horizontal by default', () => { const { container } = render(<Divider />); expect(container.firstChild).toHaveClass('h-[1px]', 'w-full'); });
    it('renders vertical', () => { const { container } = render(<Divider orientation="vertical" />); expect(container.firstChild).toHaveClass('w-[1px]'); });
    it('has role="none" when decorative', () => { const { container } = render(<Divider />); expect(container.firstChild).toHaveAttribute('role', 'none'); });
    it('has role="separator" when not decorative', () => { render(<Divider decorative={false} />); expect(screen.getByRole('separator')).toBeInTheDocument(); });
    it('merges className', () => { const { container } = render(<Divider className="custom" />); expect(container.firstChild).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Divider />); expect(await axe(container)).toHaveNoViolations(); });
});
