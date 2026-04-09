import { useState, useCallback, useMemo } from 'react';
import type { UseCommandPaletteProps, UseCommandPaletteReturn } from './CommandPalette.types';
export function useCommandPalette(props: UseCommandPaletteProps): UseCommandPaletteReturn {
    const { items, onSelect } = props;
    const [query, setQuery] = useState('');
    const filteredItems = useMemo(() => query ? items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())) : items, [items, query]);
    return {
        commandPaletteProps: { role: 'dialog', 'aria-label': 'Command palette', 'aria-modal': true },
        inputProps: { type: 'text', 'aria-label': 'Search commands', autoComplete: 'off', value: query, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value) },
        filteredItems, query, setQuery,
    };
}
