import type React from 'react';
export interface CommandItem { id: string; label: string; shortcut?: string; icon?: React.ReactNode; group?: string; onSelect?: () => void; }
export interface UseCommandPaletteProps { items: CommandItem[]; open?: boolean; onOpenChange?: (open: boolean) => void; onSelect?: (item: CommandItem) => void; }
export interface UseCommandPaletteReturn { commandPaletteProps: React.HTMLAttributes<HTMLDivElement>; inputProps: React.InputHTMLAttributes<HTMLInputElement>; filteredItems: CommandItem[]; query: string; setQuery: (q: string) => void; }
export interface CommandPaletteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'>, UseCommandPaletteProps { placeholder?: string; }
export interface StyledCommandPaletteProps extends CommandPaletteProps { className?: string; }
