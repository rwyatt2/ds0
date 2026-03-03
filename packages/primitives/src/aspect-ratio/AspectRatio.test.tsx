import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AspectRatioPrimitive } from './AspectRatio';

expect.extend(toHaveNoViolations);

describe('AspectRatioPrimitive', () => {
    it('renders children', () => {
        render(<AspectRatioPrimitive ratio={16 / 9}><img src="/test.jpg" alt="Test" /></AspectRatioPrimitive>);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies padding-bottom for aspect ratio', () => {
        const { container } = render(<AspectRatioPrimitive ratio={16 / 9}><div>Content</div></AspectRatioPrimitive>);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.paddingBottom).toBe('56.25%');
    });

    it('defaults to 1:1 ratio', () => {
        const { container } = render(<AspectRatioPrimitive><div>Content</div></AspectRatioPrimitive>);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.paddingBottom).toBe('100%');
    });

    it('has no axe violations', async () => {
        const { container } = render(<AspectRatioPrimitive ratio={16 / 9}><img src="/test.jpg" alt="Test" /></AspectRatioPrimitive>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
