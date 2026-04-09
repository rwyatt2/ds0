import React, { forwardRef } from 'react';
import { useCarousel } from './useCarousel';
import type { CarouselProps } from './Carousel.types';
const CarouselPrimitive = forwardRef<HTMLDivElement, CarouselProps>(
    ({ orientation, loop, autoPlay, autoPlayInterval, children, ...props }, ref) => {
        const totalSlides = React.Children.count(children);
        const { carouselProps } = useCarousel({ totalSlides, orientation, loop, autoPlay, autoPlayInterval });
        return (<div ref={ref} {...carouselProps} {...props}>{children}</div>);
    },
);
CarouselPrimitive.displayName = 'CarouselPrimitive';
export { CarouselPrimitive };
