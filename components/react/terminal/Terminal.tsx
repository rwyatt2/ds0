import React, { forwardRef, useRef, useEffect } from 'react';
import { cn } from '@ds0/primitives';
import { useTerminal } from '@ds0/primitives';
import type { StyledTerminalProps } from '@ds0/primitives';

const Terminal = forwardRef<HTMLDivElement, StyledTerminalProps>(
    ({ className, variant = 'default', size = 'md', lines = [], onInput, readOnly, prompt = '$', title, maxHeight, ...props }, ref) => {
        const { terminalProps, inputProps } = useTerminal({ lines, onInput, readOnly, prompt });
        const scrollRef = useRef<HTMLDivElement>(null);
        const isDark = variant === 'default';
        const fontSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

        useEffect(() => { if (scrollRef.current && typeof scrollRef.current.scrollTo === 'function') { scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight }); } }, [lines]);

        return (
            <div ref={ref} className={cn('rounded-lg overflow-hidden font-mono', isDark ? 'bg-zinc-950 text-zinc-100 border border-zinc-800' : 'bg-white text-zinc-900 border', className)} {...props}>
                <div className={cn('flex items-center gap-1.5 px-4 py-2 border-b', isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200')}>
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    {title && <span className={cn('ml-2 text-xs', isDark ? 'text-zinc-500' : 'text-gray-500')}>{title}</span>}
                </div>
                <div ref={scrollRef} className={cn('p-4 overflow-y-auto', fontSize)} style={maxHeight ? { maxHeight } : undefined} {...terminalProps}>
                    {lines.map((line, i) => (
                        <div key={i} className={cn('whitespace-pre-wrap', line.type === 'error' ? 'text-red-400' : line.type === 'input' ? (isDark ? 'text-emerald-400' : 'text-emerald-700') : '')}>
                            {line.type === 'input' && <span className={isDark ? 'text-zinc-500' : 'text-gray-400'}>{line.prompt || prompt} </span>}
                            {line.content}
                        </div>
                    ))}
                </div>
                {!readOnly && (
                    <div className={cn('flex items-center gap-2 px-4 py-2 border-t', isDark ? 'border-zinc-800' : 'border-gray-200')}>
                        <span className={cn(fontSize, isDark ? 'text-zinc-500' : 'text-gray-400')}>{prompt}</span>
                        <input {...inputProps} className={cn('flex-1 bg-transparent outline-none', fontSize, isDark ? 'text-emerald-400 caret-emerald-400' : 'text-emerald-700')} />
                    </div>
                )}
            </div>
        );
    },
);
Terminal.displayName = 'Terminal';
export { Terminal };
export type { StyledTerminalProps as TerminalProps };
