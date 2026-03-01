/**
 * Throws an error in development if the condition is falsy.
 * Provides clear, actionable error messages for DS0 consumers.
 *
 * @param condition - The condition to check
 * @param message - Error message if condition is falsy
 *
 * @example
 * ```ts
 * invariant(children != null, 'Button: `children` prop is required.');
 * ```
 */
export function invariant(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new Error(`[DS0] ${message}`);
    }
}
