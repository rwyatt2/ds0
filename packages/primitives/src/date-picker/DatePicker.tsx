import React, { forwardRef } from 'react';
import { useDatePicker } from './useDatePicker';
import type { DatePickerProps } from './DatePicker.types';
const DatePickerPrimitive = forwardRef<HTMLDivElement, DatePickerProps>(
    ({ value, defaultValue, onChange, min, max, placeholder = 'Select date', isDisabled, children, ...props }, ref) => {
        const { inputProps, triggerProps, isOpen } = useDatePicker({ value, defaultValue, onChange, min, max, isDisabled });
        return (<div ref={ref} {...props}><input {...inputProps} placeholder={placeholder} /><button type="button" {...triggerProps}>📅</button>{isOpen && children}</div>);
    },
);
DatePickerPrimitive.displayName = 'DatePickerPrimitive';
export { DatePickerPrimitive };
