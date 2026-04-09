import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CarouselPrimitive } from './Carousel';
expect.extend(toHaveNoViolations);
describe('CarouselPrimitive', () => {
    it('renders children', () => { render(<CarouselPrimitive><div>Slide 1</div><div>Slide 2</div></CarouselPrimitive>); expect(screen.getByText('Slide 1')).toBeInTheDocument(); });
    it('has carousel role description', () => { const { container } = render(<CarouselPrimitive><div>S</div></CarouselPrimitive>); expect(container.firstChild).toHaveAttribute('aria-roledescription', 'carousel'); });
    it('has no axe violations', async () => { const { container } = render(<CarouselPrimitive><div>S</div></CarouselPrimitive>); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<CarouselPrimitive ref={ref}><div>S</div></CarouselPrimitive>); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
