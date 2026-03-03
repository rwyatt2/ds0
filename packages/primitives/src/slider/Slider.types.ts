import type React from 'react';

export interface UseSliderProps {
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    isDisabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    id?: string;
}

export interface UseSliderReturn {
    trackProps: React.HTMLAttributes<HTMLDivElement>;
    trackRef: React.RefObject<HTMLDivElement | null>;
    rangeProps: React.HTMLAttributes<HTMLDivElement> & { style: React.CSSProperties };
    getThumbProps: (index: number) => React.HTMLAttributes<HTMLDivElement>;
    values: number[];
    percentages: number[];
    fieldId: string;
}

export interface SliderPrimitiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>, UseSliderProps {
    label: string;
    showValue?: boolean;
}

export interface StyledSliderProps extends SliderPrimitiveProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
