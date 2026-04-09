import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Carousel, CarouselItem } from './Carousel';
expect.extend(toHaveNoViolations);
describe('Carousel (Styled)', () => {
    it('renders slides', () => { render(<Carousel><CarouselItem>Slide 1</CarouselItem><CarouselItem>Slide 2</CarouselItem></Carousel>); expect(screen.getByText('Slide 1')).toBeInTheDocument(); });
    it('has navigation buttons', () => { render(<Carousel><CarouselItem>S1</CarouselItem><CarouselItem>S2</CarouselItem></Carousel>); expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument(); expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Carousel><CarouselItem>S</CarouselItem></Carousel>); expect(await axe(container)).toHaveNoViolations(); });
});
