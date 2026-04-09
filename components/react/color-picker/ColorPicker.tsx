import React, { forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useColorPicker } from '@ds0/primitives';
import type { StyledColorPickerProps } from '@ds0/primitives';

const swatchSizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' };

const ColorPicker = forwardRef<HTMLDivElement, StyledColorPickerProps>(
    ({ className, variant = 'default', size = 'md', value, defaultValue, onChange, swatches, isDisabled, ...props }, ref) => {
        const { triggerProps, isOpen, currentValue, setValue } = useColorPicker({ value, defaultValue, onChange, isDisabled });
        const [inputValue, setInputValue] = useState(currentValue);
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value); if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setValue(e.target.value); };
        const showPicker = variant === 'inline' || isOpen;
        return (
            <div ref={ref} className={cn('inline-flex flex-col gap-2', className)} {...props}>
                {variant !== 'inline' && <button type="button" {...triggerProps} className={cn('rounded-md border-2 border-border transition-shadow hover:ring-2 hover:ring-primary/30', swatchSizes[size])} style={{ backgroundColor: currentValue }} />}
                {showPicker && (
                    <div className="p-3 rounded-lg border border-border bg-popover shadow-lg space-y-3 w-64">
                        <input type="color" value={currentValue} onChange={(e) => { setValue(e.target.value); setInputValue(e.target.value); }} className="w-full h-32 rounded cursor-crosshair border-0" />
                        <input type="text" value={inputValue} onChange={handleInputChange} className="w-full px-2 py-1 text-sm border border-border rounded" placeholder="#000000" aria-label="Color hex value" />
                        {swatches && swatches.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">{swatches.map((s) => (<button key={s} type="button" className="h-6 w-6 rounded-sm border border-border hover:ring-2 hover:ring-primary/30" style={{ backgroundColor: s }} onClick={() => { setValue(s); setInputValue(s); }} aria-label={`Select color ${s}`} />))}</div>
                        )}
                    </div>
                )}
            </div>
        );
    },
);
ColorPicker.displayName = 'ColorPicker';
export { ColorPicker };
export type { StyledColorPickerProps as ColorPickerProps };
