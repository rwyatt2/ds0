import type { DataGridColumn } from './types';

// Inline cn utility — zero external dependencies
export function cn(...inputs: (string | boolean | null | undefined)[]): string {
    return inputs.filter(Boolean).join(' ');
}

export function getRawValue<T>(col: DataGridColumn<T>, row: T): string {
    if (col.rawValue) return String(col.rawValue(row));
    const v = col.accessor(row);
    return String(v ?? '');
}
