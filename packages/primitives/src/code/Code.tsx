import { forwardRef } from 'react';

import type { CodePrimitiveProps } from './Code.types';
import { useCode } from './useCode';

/**
 * Headless Code primitive.
 * Renders inline `<code>` or block `<pre><code>`.
 *
 * @example
 * ```tsx
 * <CodePrimitive>const x = 1</CodePrimitive>
 * <CodePrimitive variant="block">{'const x = 1;\nconst y = 2;'}</CodePrimitive>
 * ```
 */
const CodePrimitive = forwardRef<HTMLElement, CodePrimitiveProps>(
    ({ children, variant, ...rest }, ref) => {
        const { codeProps, isBlock } = useCode({ variant });

        if (isBlock) {
            return (
                <pre ref={ref as React.Ref<HTMLPreElement>} {...rest} {...codeProps}>
                    <code>{children}</code>
                </pre>
            );
        }

        return (
            <code ref={ref as React.Ref<HTMLElement>} {...rest} {...codeProps}>
                {children}
            </code>
        );
    },
);

CodePrimitive.displayName = 'CodePrimitive';

export { CodePrimitive };
