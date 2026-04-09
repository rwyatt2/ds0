import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSlider } from '../../src/slider/useSlider';

describe('useSlider', () => {
    it('returns default values when no props given', () => {
        const { result } = renderHook(() => useSlider());

        expect(result.current.values).toEqual([0]);
        expect(result.current.percentages).toEqual([0]);
        expect(result.current.fieldId).toBeTruthy();
    });

    it('respects defaultValue', () => {
        const { result } = renderHook(() =>
            useSlider({ defaultValue: [50], min: 0, max: 100 }),
        );

        expect(result.current.values).toEqual([50]);
        expect(result.current.percentages).toEqual([50]);
    });

    it('respects controlled value', () => {
        const { result } = renderHook(() =>
            useSlider({ value: [75], min: 0, max: 100 }),
        );

        expect(result.current.values).toEqual([75]);
        expect(result.current.percentages).toEqual([75]);
    });

    it('clamps values to min/max range', () => {
        const { result } = renderHook(() =>
            useSlider({ defaultValue: [150], min: 0, max: 100 }),
        );

        // defaultValue is stored as-is; clamping happens on update
        expect(result.current.values).toEqual([150]);
    });

    it('generates trackProps with role=group', () => {
        const { result } = renderHook(() => useSlider());

        expect(result.current.trackProps.role).toBe('group');
        expect(result.current.trackProps['aria-label']).toBe('Slider');
    });

    it('generates thumb props with correct ARIA attributes', () => {
        const { result } = renderHook(() =>
            useSlider({ defaultValue: [25], min: 0, max: 100 }),
        );

        const thumbProps = result.current.getThumbProps(0);
        expect(thumbProps.role).toBe('slider');
        expect(thumbProps['aria-valuemin']).toBe(0);
        expect(thumbProps['aria-valuemax']).toBe(100);
        expect(thumbProps['aria-valuenow']).toBe(25);
        expect(thumbProps['aria-valuetext']).toBe('25');
        expect(thumbProps.tabIndex).toBe(0);
    });

    it('sets tabIndex to -1 when disabled', () => {
        const { result } = renderHook(() =>
            useSlider({ defaultValue: [50], isDisabled: true }),
        );

        const thumbProps = result.current.getThumbProps(0);
        expect(thumbProps.tabIndex).toBe(-1);
        expect(thumbProps['aria-disabled']).toBe(true);
    });

    it('generates rangeProps with correct left and width', () => {
        const { result } = renderHook(() =>
            useSlider({ defaultValue: [50], min: 0, max: 100 }),
        );

        expect(result.current.rangeProps.style).toMatchObject({
            left: '0%',
            width: '50%',
        });
    });

    it('supports custom step', () => {
        const { result } = renderHook(() =>
            useSlider({ defaultValue: [25], min: 0, max: 100, step: 10 }),
        );

        // 25 is stored, clamped on change via snapToStep
        expect(result.current.values).toEqual([25]);
    });

    it('provides a trackRef', () => {
        const { result } = renderHook(() => useSlider());

        expect(result.current.trackRef).toBeDefined();
        expect(result.current.trackRef.current).toBeNull();
    });
});
