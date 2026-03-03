import { useCallback, useId, useRef, useState } from 'react';
import type { UseSliderProps, UseSliderReturn } from './Slider.types';

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number): number {
    return Math.round((value - min) / step) * step + min;
}

/**
 * Hook that encapsulates Slider behavior.
 * Manages value state, pointer drag tracking, keyboard navigation, and ARIA attributes.
 */
export function useSlider(props: UseSliderProps = {}): UseSliderReturn {
    const {
        value: controlledValue,
        defaultValue = [0],
        onValueChange,
        onValueCommit,
        min = 0,
        max = 100,
        step = 1,
        isDisabled = false,
        orientation = 'horizontal',
        id,
    } = props;

    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const trackRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const values = isControlled ? controlledValue : internalValue;

    const range = max - min;
    const percentages = values.map((v) => ((v - min) / range) * 100);

    const updateValue = useCallback(
        (newValues: number[]) => {
            const clamped = newValues.map((v) => clamp(snapToStep(v, min, step), min, max));
            if (!isControlled) setInternalValue(clamped);
            onValueChange?.(clamped);
        },
        [isControlled, min, max, step, onValueChange],
    );

    const getValueFromPosition = useCallback(
        (clientX: number): number => {
            if (!trackRef.current) return min;
            const rect = trackRef.current.getBoundingClientRect();
            const percent = orientation === 'horizontal'
                ? (clientX - rect.left) / rect.width
                : (rect.bottom - clientX) / rect.height;
            return clamp(snapToStep(min + percent * range, min, step), min, max);
        },
        [min, max, range, step, orientation],
    );

    const handleTrackPointerDown = useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (isDisabled) return;
            event.preventDefault();
            const newValue = getValueFromPosition(event.clientX);
            // Find closest thumb
            let closestIndex = 0;
            let closestDist = Math.abs(values[0]! - newValue);
            for (let i = 1; i < values.length; i++) {
                const dist = Math.abs(values[i]! - newValue);
                if (dist < closestDist) {
                    closestIndex = i;
                    closestDist = dist;
                }
            }
            const newValues = [...values];
            newValues[closestIndex] = newValue;
            updateValue(newValues);
        },
        [isDisabled, getValueFromPosition, values, updateValue],
    );

    const trackProps: UseSliderReturn['trackProps'] = {
        role: 'group',
        'aria-label': 'Slider',
        onPointerDown: handleTrackPointerDown,
    };

    const rangeStyle: React.CSSProperties = values.length === 1
        ? { left: '0%', width: `${percentages[0]}%` }
        : { left: `${Math.min(...percentages)}%`, width: `${Math.max(...percentages) - Math.min(...percentages)}%` };

    const rangeProps: UseSliderReturn['rangeProps'] = { style: rangeStyle };

    const getThumbProps = useCallback(
        (index: number) => ({
            role: 'slider' as const,
            tabIndex: isDisabled ? -1 : 0,
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': values[index],
            'aria-valuetext': String(values[index]),
            'aria-orientation': orientation,
            'aria-disabled': isDisabled || undefined,
            style: { left: `${percentages[index]}%` } as React.CSSProperties,
            onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (isDisabled) return;
                const current = values[index]!;
                let newValue = current;
                const largeStep = step * 10;

                switch (event.key) {
                    case 'ArrowRight':
                    case 'ArrowUp':
                        newValue = current + step;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowDown':
                        newValue = current - step;
                        break;
                    case 'PageUp':
                        newValue = current + largeStep;
                        break;
                    case 'PageDown':
                        newValue = current - largeStep;
                        break;
                    case 'Home':
                        newValue = min;
                        break;
                    case 'End':
                        newValue = max;
                        break;
                    default:
                        return;
                }

                event.preventDefault();
                const newValues = [...values];
                newValues[index] = clamp(newValue, min, max);
                updateValue(newValues);
            },
            onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
                if (isDisabled) return;
                event.stopPropagation();
                const element = event.currentTarget;
                element.setPointerCapture(event.pointerId);

                const handlePointerMove = (moveEvent: PointerEvent) => {
                    const newValue = getValueFromPosition(moveEvent.clientX);
                    const newValues = [...values];
                    newValues[index] = newValue;
                    updateValue(newValues);
                };

                const handlePointerUp = () => {
                    element.removeEventListener('pointermove', handlePointerMove);
                    element.removeEventListener('pointerup', handlePointerUp);
                    onValueCommit?.(values);
                };

                element.addEventListener('pointermove', handlePointerMove);
                element.addEventListener('pointerup', handlePointerUp);
            },
        }),
        [values, percentages, min, max, step, isDisabled, orientation, updateValue, getValueFromPosition, onValueCommit],
    );

    return { trackProps, trackRef, rangeProps, getThumbProps, values, percentages, fieldId };
}

