import { useCallback, useState, useEffect, useRef } from 'react';
import type { UseCarouselProps, UseCarouselReturn } from './Carousel.types';

export function useCarousel(props: UseCarouselProps): UseCarouselReturn {
    const { totalSlides, orientation = 'horizontal', loop = false, autoPlay = false, autoPlayInterval = 5000 } = props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const canGoNext = loop || currentSlide < totalSlides - 1;
    const canGoPrevious = loop || currentSlide > 0;

    const goToSlide = useCallback((index: number) => {
        if (index < 0) setCurrentSlide(loop ? totalSlides - 1 : 0);
        else if (index >= totalSlides) setCurrentSlide(loop ? 0 : totalSlides - 1);
        else setCurrentSlide(index);
    }, [totalSlides, loop]);

    const goToNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
    const goToPrevious = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

    useEffect(() => {
        if (autoPlay && totalSlides > 1) {
            timerRef.current = setInterval(goToNext, autoPlayInterval);
            return () => clearInterval(timerRef.current);
        }
    }, [autoPlay, autoPlayInterval, goToNext, totalSlides]);

    return {
        carouselProps: { 'aria-roledescription': 'carousel', 'aria-label': `Slide ${currentSlide + 1} of ${totalSlides}` },
        currentSlide, goToSlide, goToNext, goToPrevious, canGoNext, canGoPrevious,
    };
}
