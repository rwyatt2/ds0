import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import type { StyledChangelogProps } from '@ds0/primitives';
const typeBadge = { feature: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400', fix: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', breaking: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', improvement: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' };
const Changelog = forwardRef<HTMLDivElement, StyledChangelogProps>(({ className, variant = 'default', entries, title, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-6', className)} role="feed" aria-label="Changelog" {...props}>
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {entries.map(e => (
            <article key={e.id} className={cn('relative pl-6 pb-6 border-l-2 border-border', variant === 'compact' ? 'pl-4 pb-3' : '')}>
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                <div className="flex items-center gap-2 mb-1"><span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', typeBadge[e.type])}>{e.type}</span><time className="text-xs text-muted-foreground">{e.date}</time></div>
                <h3 className="text-sm font-semibold">{e.version} — {e.title}</h3>
                {e.description && <p className="text-sm text-muted-foreground mt-1">{e.description}</p>}
            </article>
        ))}
    </div>
));
Changelog.displayName = 'Changelog';
export { Changelog };
export type { StyledChangelogProps as ChangelogProps };
