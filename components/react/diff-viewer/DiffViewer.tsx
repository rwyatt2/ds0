import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useDiffViewer } from '@ds0/primitives';
import type { StyledDiffViewerProps } from '@ds0/primitives';

const diffViewerVariants = cva('rounded-lg overflow-hidden font-mono', {
    variants: { variant: { default: 'border bg-card', dark: 'border border-zinc-800 bg-zinc-950' }, size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' } },
    defaultVariants: { variant: 'default', size: 'md' },
});

const DiffViewer = forwardRef<HTMLDivElement, StyledDiffViewerProps>(
    ({ className, variant = 'default', size, oldValue, newValue, mode, context, title, oldTitle, newTitle, maxHeight, ...props }, ref) => {
        const { diffViewerProps, lines, stats } = useDiffViewer({ oldValue, newValue, mode, context });
        const isDark = variant === 'dark';
        return (
            <div ref={ref} className={cn(diffViewerVariants({ variant, size }), className)} {...props}>
                <div className={cn('flex items-center justify-between px-4 py-2 border-b', isDark ? 'border-zinc-800 bg-zinc-900' : 'border-border bg-muted')}>
                    <span className={cn('text-xs font-medium', isDark ? 'text-zinc-400' : 'text-muted-foreground')}>{title || `${oldTitle || 'Original'} → ${newTitle || 'Modified'}`}</span>
                    <span className="flex items-center gap-2 text-xs"><span className="text-emerald-600">+{stats.added}</span><span className="text-red-600">-{stats.removed}</span></span>
                </div>
                <div className={cn('overflow-auto', maxHeight && 'overflow-y-auto')} style={maxHeight ? { maxHeight } : undefined} {...diffViewerProps}>
                    <table className="w-full border-collapse">
                        <tbody>{lines.map((line, i) => (
                            <tr key={i} className={cn(line.type === 'add' && (isDark ? 'bg-emerald-950/50' : 'bg-emerald-50'), line.type === 'remove' && (isDark ? 'bg-red-950/50' : 'bg-red-50'))}>
                                <td className={cn('w-10 text-right pr-2 select-none', isDark ? 'text-zinc-600' : 'text-muted-foreground/50')}>{line.oldLineNumber || ''}</td>
                                <td className={cn('w-10 text-right pr-2 select-none', isDark ? 'text-zinc-600' : 'text-muted-foreground/50')}>{line.newLineNumber || ''}</td>
                                <td className={cn('w-5 text-center select-none', line.type === 'add' ? 'text-emerald-600' : line.type === 'remove' ? 'text-red-600' : 'text-muted-foreground')}>{line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}</td>
                                <td className={cn('px-3 py-0.5 whitespace-pre', isDark ? 'text-zinc-300' : 'text-foreground')}>{line.content || ' '}</td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            </div>
        );
    },
);
DiffViewer.displayName = 'DiffViewer';
export { DiffViewer, diffViewerVariants };
export type { StyledDiffViewerProps as DiffViewerProps };
