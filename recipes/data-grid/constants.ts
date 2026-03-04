import type { DensityMode } from './types';

// ─── Static Constants ─────────────────────────────────────────
// Hoisted outside the component to avoid recreating on every render.

export const DENSITY_CLASSES: Record<DensityMode, string> = {
    compact: 'dg-density-compact',
    normal: 'dg-density-normal',
    comfortable: 'dg-density-comfortable',
} as const;

export const CELL_PAD_CLASSES: Record<DensityMode, string> = {
    compact: 'dg-cell-compact',
    normal: 'dg-cell-normal',
    comfortable: 'dg-cell-comfortable',
} as const;

export const DENSITY_OPTIONS = ['compact', 'normal', 'comfortable'] as const;
