import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { SkeletonPrimitive } from './Skeleton';

expect.extend(toHaveNoViolations);

describe('SkeletonPrimitive', () => {
    it('renders with aria-hidden', () => {
        const { container } = render(<SkeletonPrimitive />);
        expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });
    it('applies width and height', () => {
        const { container } = render(<SkeletonPrimitive width="200px" height="20px" />);
        expect(container.firstChild).toHaveStyle({ width: '200px', height: '20px' });
    });
    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<SkeletonPrimitive ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
    it('has no axe violations', async () => {
        const { container } = render(<SkeletonPrimitive />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
