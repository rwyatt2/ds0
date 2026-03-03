import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContainerPrimitive } from './Container';

expect.extend(toHaveNoViolations);

describe('ContainerPrimitive', () => {
    it('renders as div by default', () => {
        render(<ContainerPrimitive data-testid="c">content</ContainerPrimitive>);
        expect(screen.getByTestId('c').tagName).toBe('DIV');
    });
    it('renders custom element', () => {
        render(<ContainerPrimitive as="main" data-testid="c">content</ContainerPrimitive>);
        expect(screen.getByTestId('c').tagName).toBe('MAIN');
    });
    it('has no axe violations', async () => {
        const { container } = render(<ContainerPrimitive>content</ContainerPrimitive>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
