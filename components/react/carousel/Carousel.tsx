import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useCarousel } from '@ds0/primitives';
import type { StyledCarouselProps } from '@ds0/primitives';

const carouselVariants = cva('relative overflow-hidden', { variants: { variant: { default: '', card: 'px-4' } }, defaultVariants: { variant: 'default' } });

const Carousel = forwardRef<HTMLDivElement, StyledCarouselProps>(
    ({ className, variant, orientation = 'horizontal', loop, autoPlay, autoPlayInterval, children, ...props }, ref) => {
        const childArray = React.Children.toArray(children);
        const { carouselProps, currentSlide, goToNext, goToPrevious, canGoNext, canGoPrevious } = useCarousel({ totalSlides: childArray.length, orientation, loop, autoPlay, autoPlayInterval });
        return (
            <div ref={ref} className={cn(carouselVariants({ variant }), className)} {...carouselProps} {...props}>
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {childArray.map((child, i) => (
                        <div key={i} className="w-full flex-shrink-0" role="group" aria-roledescription="slide" aria-label={`Slide ${i + 1} of ${childArray.length}`}>
                            {child}
                        </div>
                    ))}
                </div>
                <button type="button" onClick={goToPrevious} disabled={!canGoPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background disabled:opacity-50" aria-label="Previous slide">←</button>
                <button type="button" onClick={goToNext} disabled={!canGoNext} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background disabled:opacity-50" aria-label="Next slide">→</button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {childArray.map((_, i) => (
                        <button key={i} type="button" className={cn('h-2 w-2 rounded-full transition-colors', i === currentSlide ? 'bg-primary' : 'bg-muted')} aria-label={`Go to slide ${i + 1}`} />
                    ))}
                </div>
            </div>
        );
    },
);
Carousel.displayName = 'Carousel';
const CarouselItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (<div ref={ref} className={cn('', className)} {...props} />));
CarouselItem.displayName = 'CarouselItem';
export { Carousel, CarouselItem, carouselVariants };
export type { StyledCarouselProps as CarouselProps };
