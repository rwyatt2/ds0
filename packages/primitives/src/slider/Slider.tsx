import { forwardRef } from 'react';
import type { SliderPrimitiveProps } from './Slider.types';
import { useSlider } from './useSlider';

const SliderPrimitive = forwardRef<HTMLDivElement, SliderPrimitiveProps>(
    ({ label, showValue, value, defaultValue, onValueChange, onValueCommit, min, max, step, isDisabled, orientation, id, ...rest }, ref) => {
        const { trackProps, rangeProps, getThumbProps, values, fieldId } = useSlider({ value, defaultValue, onValueChange, onValueCommit, min, max, step, isDisabled, orientation, id });
        const labelId = `${fieldId}-label`;

        return (
            <div ref={ref} {...rest}>
                <div>
                    <label id={labelId}>{label}</label>
                    {showValue && <span aria-live="polite">{values.join(' – ')}</span>}
                </div>
                <div {...trackProps} aria-labelledby={labelId}>
                    <div {...rangeProps} />
                    {values.map((_, i) => (<div key={i} {...getThumbProps(i)} aria-labelledby={labelId} />))}
                </div>
            </div>
        );
    },
);

SliderPrimitive.displayName = 'SliderPrimitive';
export { SliderPrimitive };
