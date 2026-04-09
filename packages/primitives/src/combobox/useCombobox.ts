import { useState, useCallback, useMemo, useId, useEffect } from 'react';
import type { UseComboboxProps, UseComboboxReturn } from './Combobox.types';

export function useCombobox<T = string>(props: UseComboboxProps<T>): UseComboboxReturn<T> {
    const { items, value, defaultValue, onValueChange, filterFn, getLabel = (item: T) => String(item) } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState<T | undefined>(value ?? defaultValue);
    const listId = useId();

    const filteredItems = useMemo(() => {
        if (!query) return items;
        const fn = filterFn ?? ((item: T, q: string) => getLabel(item).toLowerCase().includes(q.toLowerCase()));
        return items.filter((item) => fn(item, query));
    }, [items, query, filterFn, getLabel]);

    const selectItem = useCallback((item: T) => {
        setSelectedValue(item);
        setQuery(getLabel(item));
        setIsOpen(false);
        onValueChange?.(item);
    }, [getLabel, onValueChange]);

    const openPopover = useCallback(() => setIsOpen(true), []);
    const closePopover = useCallback(() => setIsOpen(false), []);

    useEffect(() => { if (value !== undefined) setSelectedValue(value); }, [value]);

    return {
        isOpen, query, setQuery, filteredItems, selectedValue, selectItem, openPopover, closePopover,
        inputProps: {
            role: 'combobox' as const, 'aria-expanded': isOpen, 'aria-autocomplete': 'list' as const, 'aria-controls': listId,
            value: query, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value); setIsOpen(true); },
            onFocus: openPopover,
        },
        listProps: { id: listId, role: 'listbox' as const },
        getItemProps: (item: T) => ({ role: 'option' as const, 'aria-selected': item === selectedValue, onClick: () => selectItem(item), tabIndex: 0 }),
    };
}
