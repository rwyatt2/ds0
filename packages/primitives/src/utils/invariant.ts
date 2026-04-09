/**
 * Throws an error in development if the condition is falsy.
 * Provides clear, actionable error messages for DS0 consumers.
 *
 * @param condition - The condition to check
 * @param message - Error message if condition is falsy
 * @param docUrl - Optional documentation URL for debugging
 *
 * @example
 * ```ts
 * invariant(children != null, 'Button: `children` prop is required.', 'https://ds0.dev/docs/components/button');
 * ```
 */
export function invariant(condition: unknown, message: string, docUrl?: string): asserts condition {
    if (!condition) {
        const suffix = docUrl ? ` Docs: ${docUrl}` : '';
        throw new Error(`[DS0] ${message}${suffix}`);
    }
}
