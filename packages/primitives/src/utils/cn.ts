import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 * Handles conditional classes and Tailwind conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 * // => 'px-4 py-2 bg-primary custom-class'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
