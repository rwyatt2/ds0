import React, { forwardRef } from 'react';
import { useColorPicker } from './useColorPicker';
import type { ColorPickerProps } from './ColorPicker.types';
const ColorPickerPrimitive = forwardRef<HTMLDivElement, ColorPickerProps>(
    ({ value, defaultValue, onChange, format, isDisabled, children, ...props }, ref) => {
        const { triggerProps, currentValue, isOpen } = useColorPicker({ value, defaultValue, onChange, format, isDisabled });
        return (<div ref={ref} {...props}><button type="button" {...triggerProps} style={{ backgroundColor: currentValue, width: 40, height: 40, border: '1px solid', borderRadius: 4 }} />{isOpen && children}</div>);
    },
);
ColorPickerPrimitive.displayName = 'ColorPickerPrimitive';
export { ColorPickerPrimitive };
