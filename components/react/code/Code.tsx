import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useCode } from '@ds0/primitives';
import type { StyledCodeProps } from '@ds0/primitives';

const codeVariants = cva('font-mono', {
    variants: {
        variant: {
            inline: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm',
            block: 'relative rounded-lg bg-muted p-4 text-sm overflow-x-auto',
        },
    },
    defaultVariants: {
        variant: 'inline',
    },
});

type CodeVariants = VariantProps<typeof codeVariants>;
interface CodeProps extends StyledCodeProps, CodeVariants { }

/**
 * Styled Code component.
 * Renders inline or block code with monospace styling.
 *
 * @example
 * ```tsx
 * <Code>npm install ds0</Code>
 * <Code variant="block">{'const x = 1;\nconst y = 2;'}</Code>
 * ```
 */
const Code = forwardRef<HTMLElement, CodeProps>(
    ({ className, variant = 'inline', children, ...props }, ref) => {
        const { isBlock } = useCode({ variant });

        if (isBlock) {
            return (
                <pre ref={ref as React.Ref<HTMLPreElement>} className={cn(codeVariants({ variant }), className)} {...props}>
                    <code>{children}</code>
                </pre>
            );
        }

        return (
            <code ref={ref as React.Ref<HTMLElement>} className={cn(codeVariants({ variant }), className)} {...props}>
                {children}
            </code>
        );
    },
);

Code.displayName = 'Code';

export { Code, codeVariants };
export type { CodeProps };
