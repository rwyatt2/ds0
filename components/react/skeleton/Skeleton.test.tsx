import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Skeleton } from './Skeleton';
expect.extend(toHaveNoViolations);
describe('Skeleton (Styled)', () => {
    it('renders with aria-hidden', () => { const { container } = render(<Skeleton />); expect(container.firstChild).toHaveAttribute('aria-hidden', 'true'); });
    it('applies variant classes', () => { const { container } = render(<Skeleton variant="circular" />); expect(container.firstChild).toHaveClass('rounded-full'); });
    it('applies width and height', () => { const { container } = render(<Skeleton width="200px" height="20px" />); expect(container.firstChild).toHaveStyle({ width: '200px', height: '20px' }); });
    it('renders multiple lines', () => { const { container } = render(<Skeleton lines={3} />); expect(container.querySelectorAll('[class*="rounded"]')).toHaveLength(3); });
    it('has no axe violations', async () => { const { container } = render(<Skeleton />); expect(await axe(container)).toHaveNoViolations(); });
});
