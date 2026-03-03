import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useSlider } from '@ds0/primitives';
import type { StyledSliderProps } from '@ds0/primitives';
import { Label } from '../label';

const sliderTrackVariants = cva('relative w-full grow overflow-hidden rounded-full bg-secondary', {
    variants: { size: { sm: 'h-1', md: 'h-2', lg: 'h-3' } },
    defaultVariants: { size: 'md' },
});

const sliderThumbVariants = cva(
    'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 block rounded-full border-2 border-primary bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: { size: { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' } },
        defaultVariants: { size: 'md' },
    },
);

type SliderVariantProps = VariantProps<typeof sliderTrackVariants>;

interface SliderProps extends Omit<StyledSliderProps, 'size'>, SliderVariantProps { }

const Slider = forwardRef<HTMLDivElement, SliderProps>(
    ({ className, size, label, showValue, value, defaultValue, onValueChange, onValueCommit, min = 0, max = 100, step = 1, isDisabled, orientation, id, ...props }, ref) => {
        const { trackProps, rangeProps, getThumbProps, values, fieldId } = useSlider({ value, defaultValue, onValueChange, onValueCommit, min, max, step, isDisabled, orientation, id });
        const labelId = `${fieldId}-label`;

        return (
            <div ref={ref} className={cn('space-y-2', isDisabled && 'opacity-50', className)} {...props}>
                <div className="flex items-center justify-between">
                    <Label id={labelId} disabled={isDisabled}>{label}</Label>
                    {showValue && <span className="text-sm text-muted-foreground" aria-live="polite">{values.join(' – ')}</span>}
                </div>
                <div className="relative flex items-center" {...trackProps} aria-labelledby={labelId}>
                    <div className={cn(sliderTrackVariants({ size }))}>
                        <div className="absolute h-full bg-primary rounded-full" {...rangeProps} />
                    </div>
                    {values.map((_, i) => {
                        const thumbProps = getThumbProps(i);
                        return <div key={i} className={cn(sliderThumbVariants({ size }), 'cursor-grab active:cursor-grabbing')} {...thumbProps} />;
                    })}
                </div>
            </div>
        );
    },
);

Slider.displayName = 'Slider';
export { Slider, sliderTrackVariants, sliderThumbVariants };
export type { SliderProps };
