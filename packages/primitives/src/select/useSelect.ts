import { useCallback, useId, useRef, useState } from 'react';
import { useControllable } from '../utils/useControllable';
import type { UseSelectProps, UseSelectReturn } from './Select.types';

export function useSelect(props: UseSelectProps = {}): UseSelectReturn {
    const {
        value: controlledValue, defaultValue = '', onValueChange,
        open: controlledOpen, defaultOpen = false, onOpenChange,
        isDisabled = false, isRequired: _isRequired = false,
        placeholder = 'Select...',
    } = props;

    const { value: selectedValue, setValue: setSelectedValue } = useControllable<string>({
        value: controlledValue, defaultValue, onChange: onValueChange,
    });

    const { value: isOpen, setValue: setIsOpen } = useControllable<boolean>({
        value: controlledOpen, defaultValue: defaultOpen, onChange: onOpenChange,
    });

    const baseId = useId();
    const ids = {
        trigger: `${baseId}-select-trigger`,
        content: `${baseId}-select-content`,
        label: `${baseId}-select-label`,
    };

    // Option registry for label lookup and typeahead
    const optionsRef = useRef<Map<string, string>>(new Map());
    const [selectedLabel, setSelectedLabel] = useState<string>('');

    const open = useCallback(() => { if (!isDisabled) setIsOpen(true); }, [isDisabled, setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    const toggle = useCallback(() => { if (!isDisabled) setIsOpen(!isOpen); }, [isDisabled, isOpen, setIsOpen]);

    const select = useCallback((value: string, label: string) => {
        setSelectedValue(value);
        setSelectedLabel(label);
        close();
    }, [setSelectedValue, close]);

    const registerOption = useCallback((value: string, label: string) => {
        optionsRef.current.set(value, label);
        // If this option is the currently selected value, update label
        if (value === selectedValue && !selectedLabel) {
            setSelectedLabel(label);
        }
    }, [selectedValue, selectedLabel]);

    const unregisterOption = useCallback((value: string) => {
        optionsRef.current.delete(value);
    }, []);

    return {
        isOpen, selectedValue, selectedLabel: selectedLabel || placeholder,
        open, close, toggle, select, ids,
        registerOption, unregisterOption,
        triggerProps: {
            id: ids.trigger, type: 'button', role: 'combobox',
            'aria-expanded': isOpen, 'aria-haspopup': 'listbox',
            'aria-controls': isOpen ? ids.content : undefined,
            'aria-disabled': isDisabled || undefined,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); toggle(); },
        },
        contentProps: {
            id: ids.content, role: 'listbox',
            'aria-labelledby': ids.trigger,
        },
    };
}
