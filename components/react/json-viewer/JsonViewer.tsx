import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useJsonViewer } from '@ds0/primitives';
import type { StyledJsonViewerProps } from '@ds0/primitives';

const jsonViewerVariants = cva('rounded-lg overflow-hidden font-mono', {
    variants: { variant: { default: 'border bg-card text-card-foreground', dark: 'border border-zinc-800 bg-zinc-950 text-zinc-50' }, size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' } },
    defaultVariants: { variant: 'default', size: 'md' },
});

const typeColors = { string: 'text-emerald-600 dark:text-emerald-400', number: 'text-blue-600 dark:text-blue-400', boolean: 'text-amber-600 dark:text-amber-400', null: 'text-red-500 dark:text-red-400', key: 'text-violet-600 dark:text-violet-400', bracket: 'text-muted-foreground' };

const JsonNode = ({ data, path, depth, expandedPaths, toggleNode, sortKeys, isDark }: { data: unknown; path: string; depth: number; expandedPaths: Set<string>; toggleNode: (p: string) => void; sortKeys?: boolean; isDark: boolean }) => {
    if (data === null) return <span className={typeColors.null}>null</span>;
    if (typeof data === 'boolean') return <span className={typeColors.boolean}>{String(data)}</span>;
    if (typeof data === 'number') return <span className={typeColors.number}>{data}</span>;
    if (typeof data === 'string') return <span className={typeColors.string}>"{data}"</span>;
    if (typeof data !== 'object') return <span>{String(data)}</span>;

    const isArray = Array.isArray(data);
    const isExpanded = expandedPaths.has(path);
    let entries = isArray ? (data as unknown[]).map((v, i) => [String(i), v] as const) : Object.entries(data as Record<string, unknown>);
    if (sortKeys && !isArray) entries = [...entries].sort((a, b) => a[0].localeCompare(b[0]));
    const count = entries.length;

    return (
        <div role="treeitem" aria-expanded={isExpanded}>
            <span onClick={() => toggleNode(path)} className="cursor-pointer select-none inline-flex items-center gap-1 hover:bg-accent/50 rounded px-0.5">
                <span className="text-muted-foreground text-[0.7em]">{isExpanded ? '▼' : '▶'}</span>
                <span className={typeColors.bracket}>{isArray ? '[' : '{'}</span>
                {!isExpanded && <span className="text-muted-foreground">{count} {count === 1 ? 'item' : 'items'}</span>}
                {!isExpanded && <span className={typeColors.bracket}>{isArray ? ']' : '}'}</span>}
            </span>
            {isExpanded && (
                <div role="group" className="pl-5 border-l border-border/30 ml-1">
                    {entries.map(([key, value], i) => (
                        <div key={key} className="py-px">
                            <span className={isArray ? typeColors.number : typeColors.key}>{isArray ? key : `"${key}"`}</span>
                            <span className="text-muted-foreground">: </span>
                            <JsonNode data={value} path={`${path}.${key}`} depth={depth + 1} expandedPaths={expandedPaths} toggleNode={toggleNode} sortKeys={sortKeys} isDark={isDark} />
                            {i < entries.length - 1 && <span className="text-muted-foreground">,</span>}
                        </div>
                    ))}
                    <span className={typeColors.bracket}>{isArray ? ']' : '}'}</span>
                </div>
            )}
        </div>
    );
};

const JsonViewer = forwardRef<HTMLDivElement, StyledJsonViewerProps>(
    ({ className, variant = 'default', size, data, defaultExpandDepth, sortKeys, copyable, maxHeight, ...props }, ref) => {
        const { jsonViewerProps, toggleNode, expandAll, collapseAll, expandedPaths } = useJsonViewer({ data, defaultExpandDepth, sortKeys, copyable });
        const isDark = variant === 'dark';
        return (
            <div ref={ref} className={cn(jsonViewerVariants({ variant, size }), className)} {...props}>
                <div className={cn('flex items-center justify-end gap-1 px-3 py-1.5 border-b', isDark ? 'border-zinc-800' : 'border-border')}>
                    <button onClick={expandAll} className="text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-accent">Expand All</button>
                    <button onClick={collapseAll} className="text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-accent">Collapse All</button>
                </div>
                <div className={cn('p-3 overflow-auto', maxHeight && 'overflow-y-auto')} style={maxHeight ? { maxHeight } : undefined} {...jsonViewerProps}>
                    <JsonNode data={data} path="$" depth={0} expandedPaths={expandedPaths} toggleNode={toggleNode} sortKeys={sortKeys} isDark={isDark} />
                </div>
            </div>
        );
    },
);
JsonViewer.displayName = 'JsonViewer';
export { JsonViewer, jsonViewerVariants };
export type { StyledJsonViewerProps as JsonViewerProps };
