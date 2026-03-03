import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import { cn } from '@ds0/primitives';

import { Dialog } from '../../components/react/dialog';
import { Stack } from '../../components/react/stack';
import { Text } from '../../components/react/text';
import { Badge } from '../../components/react/badge';

/**
 * A command item.
 */
interface CommandItem {
    /** Unique id */
    id: string;
    /** Display label */
    label: string;
    /** Description */
    description?: string;
    /** Keyboard shortcut */
    shortcut?: string;
    /** Icon */
    icon?: React.ReactNode;
    /** Group name for grouping commands */
    group?: string;
    /** Action handler */
    onSelect: () => void;
    /** Disabled state */
    disabled?: boolean;
}

/**
 * Props for the CommandPalette recipe component.
 */
interface CommandPaletteProps {
    /** Command items */
    commands: CommandItem[];
    /** Whether the palette is open */
    open: boolean;
    /** Open state change handler */
    onOpenChange: (open: boolean) => void;
    /** Search placeholder */
    placeholder?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Search icon.
 */
function SearchIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted-foreground shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
    );
}

/**
 * CommandPalette recipe.
 * A keyboard-driven command search dialog (Cmd+K) for quick actions.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * // Register Cmd+K
 * useEffect(() => {
 *   const handler = (e: KeyboardEvent) => {
 *     if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 *       e.preventDefault();
 *       setOpen(true);
 *     }
 *   };
 *   document.addEventListener('keydown', handler);
 *   return () => document.removeEventListener('keydown', handler);
 * }, []);
 *
 * <CommandPalette
 *   open={open}
 *   onOpenChange={setOpen}
 *   commands={[{ id: '1', label: 'Go to Dashboard', onSelect: () => navigate('/') }]}
 * />
 * ```
 */
function CommandPalette({
    commands,
    open,
    onOpenChange,
    placeholder = 'Type a command or search…',
    className,
}: CommandPaletteProps): React.ReactElement {
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter commands based on search
    const filteredCommands = useMemo(() => {
        if (!search) return commands;
        const q = search.toLowerCase();
        return commands.filter(
            (cmd) =>
                cmd.label.toLowerCase().includes(q) ||
                cmd.description?.toLowerCase().includes(q) ||
                cmd.group?.toLowerCase().includes(q),
        );
    }, [commands, search]);

    // Group filtered commands
    const grouped = useMemo(() => {
        const groups = new Map<string, CommandItem[]>();
        for (const cmd of filteredCommands) {
            const group = cmd.group ?? '';
            const items = groups.get(group) ?? [];
            items.push(cmd);
            groups.set(group, items);
        }
        return Array.from(groups.entries());
    }, [filteredCommands]);

    // Reset state when opened
    useEffect(() => {
        if (open) {
            setSearch('');
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent): void => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = filteredCommands[activeIndex];
                if (cmd && !cmd.disabled) {
                    cmd.onSelect();
                    onOpenChange(false);
                }
            }
        },
        [filteredCommands, activeIndex, onOpenChange],
    );

    // Scroll active item into view
    useEffect(() => {
        const active = listRef.current?.querySelector('[data-active="true"]');
        active?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    let flatIndex = -1;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Content size="sm" className={cn('p-0 gap-0 overflow-hidden', className)}>
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b px-4">
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                        aria-label="Command search"
                        role="combobox"
                        aria-expanded={true}
                        aria-autocomplete="list"
                    />
                    <Badge variant="outline" className="text-xs">
                        ESC
                    </Badge>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-80 overflow-y-auto p-2" role="listbox">
                    {filteredCommands.length === 0 ? (
                        <Text size="sm" color="muted" align="center" className="py-8">
                            No results found.
                        </Text>
                    ) : (
                        grouped.map(([group, items]) => (
                            <div key={group}>
                                {group && (
                                    <Text
                                        as="span"
                                        size="xs"
                                        weight="semibold"
                                        color="muted"
                                        className="block px-2 py-1.5 uppercase tracking-wider"
                                    >
                                        {group}
                                    </Text>
                                )}
                                {items.map((cmd) => {
                                    flatIndex += 1;
                                    const isActive = flatIndex === activeIndex;
                                    const currentIndex = flatIndex;
                                    return (
                                        <button
                                            key={cmd.id}
                                            type="button"
                                            role="option"
                                            aria-selected={isActive}
                                            aria-disabled={cmd.disabled}
                                            data-active={isActive}
                                            className={cn(
                                                'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                                                isActive && 'bg-accent text-accent-foreground',
                                                cmd.disabled && 'opacity-50 cursor-not-allowed',
                                                !isActive && !cmd.disabled && 'hover:bg-accent/50',
                                            )}
                                            onClick={() => {
                                                if (!cmd.disabled) {
                                                    cmd.onSelect();
                                                    onOpenChange(false);
                                                }
                                            }}
                                            onMouseEnter={() => setActiveIndex(currentIndex)}
                                        >
                                            {cmd.icon && <span className="shrink-0">{cmd.icon}</span>}
                                            <span className="flex-1 text-left">{cmd.label}</span>
                                            {cmd.shortcut && (
                                                <Badge variant="outline" className="text-xs ml-auto">
                                                    {cmd.shortcut}
                                                </Badge>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </Dialog.Content>
        </Dialog>
    );
}

CommandPalette.displayName = 'CommandPalette';

export { CommandPalette };
export type { CommandPaletteProps, CommandItem };
