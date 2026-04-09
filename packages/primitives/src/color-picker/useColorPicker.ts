import { useCallback, useState } from 'react';
import type { UseColorPickerProps, UseColorPickerReturn } from './ColorPicker.types';
export function useColorPicker(props: UseColorPickerProps = {}): UseColorPickerReturn {
    const { value, defaultValue = '#000000', onChange, isDisabled = false } = props;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const currentValue = value !== undefined ? value : internalValue;
    const setValue = useCallback((color: string) => { if (isDisabled) return; if (onChange) onChange(color); else setInternalValue(color); }, [isDisabled, onChange]);
    const toggle = useCallback(() => { if (!isDisabled) setIsOpen((o) => !o); }, [isDisabled]);
    return { triggerProps: { 'aria-expanded': isOpen, 'aria-disabled': isDisabled || undefined, 'aria-label': `Color picker, current color: ${currentValue}`, onClick: toggle }, isOpen, toggle, currentValue, setValue };
}
