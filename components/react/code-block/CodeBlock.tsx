import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useCodeBlock } from '@ds0/primitives';
import type { StyledCodeBlockProps } from '@ds0/primitives';

const codeBlockVariants = cva('relative rounded-lg overflow-hidden', {
    variants: {
        variant: { default: 'border bg-zinc-950 text-zinc-50', ghost: 'bg-muted/50 text-foreground' },
        size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' },
    },
    defaultVariants: { variant: 'default', size: 'md' },
});

const CopyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>);

const CodeBlock = forwardRef<HTMLPreElement, StyledCodeBlockProps>(
    ({ className, variant = 'default', size, code, language, showLineNumbers = false, highlightLines, copyable = true, title, maxHeight, ...props }, ref) => {
        const { codeBlockProps, copyButtonProps, isCopied } = useCodeBlock({ code, language, showLineNumbers, highlightLines, copyable });
        const lines = code.split('\n');
        const isDark = variant === 'default';
        return (
            <div className={cn(codeBlockVariants({ variant, size }), className)}>
                {(title || copyable) && (
                    <div className={cn('flex items-center justify-between px-4 py-2 border-b', isDark ? 'border-zinc-800 bg-zinc-900' : 'border-border bg-muted')}>
                        {title && <span className={cn('text-xs font-medium', isDark ? 'text-zinc-400' : 'text-muted-foreground')}>{title}</span>}
                        {!title && <span />}
                        {copyable && (
                            <button {...copyButtonProps} className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors', isDark ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800' : 'text-muted-foreground hover:text-foreground hover:bg-accent')}>
                                {isCopied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
                            </button>
                        )}
                    </div>
                )}
                <pre ref={ref} className={cn('overflow-x-auto p-4 font-mono', maxHeight && 'overflow-y-auto')} style={maxHeight ? { maxHeight } : undefined} {...props} {...codeBlockProps}>
                    <code className="grid">
                        {lines.map((line, i) => {
                            const lineNum = i + 1;
                            const isHighlighted = highlightLines?.includes(lineNum);
                            return (
                                <span key={i} className={cn('px-1', isHighlighted && (isDark ? 'bg-blue-500/15 border-l-2 border-blue-400' : 'bg-yellow-100 border-l-2 border-yellow-400'))}>
                                    {showLineNumbers && <span className={cn('inline-block w-8 text-right mr-4 select-none', isDark ? 'text-zinc-600' : 'text-muted-foreground/50')}>{lineNum}</span>}
                                    {line || ' '}
                                </span>
                            );
                        })}
                    </code>
                </pre>
            </div>
        );
    },
);
CodeBlock.displayName = 'CodeBlock';
export { CodeBlock, codeBlockVariants };
export type { StyledCodeBlockProps as CodeBlockProps };
