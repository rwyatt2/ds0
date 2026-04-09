import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useRichText } from '@ds0/primitives';
import type { StyledRichTextProps } from '@ds0/primitives';

const editorSizes = { sm: 'min-h-24', md: 'min-h-40', lg: 'min-h-64' };

const RichText = forwardRef<HTMLDivElement, StyledRichTextProps>(
    ({ className, variant = 'default', size = 'md', value, defaultValue, onChange, onTextChange, placeholder, maxLength, isDisabled, isReadOnly, ...props }, ref) => {
        const { editorProps, toolbarProps, execCommand, isActive, characterCount } = useRichText({ value, defaultValue, onChange, onTextChange, placeholder, maxLength, isDisabled, isReadOnly });
        const minimalTools = ['bold', 'italic', 'underline'];
        const fullTools = [...minimalTools, 'strikeThrough', 'insertOrderedList', 'insertUnorderedList', 'formatBlock'];
        const tools = variant === 'minimal' ? minimalTools : fullTools;
        const toolLabels: Record<string, string> = { bold: 'B', italic: 'I', underline: 'U', strikeThrough: 'S', insertOrderedList: '1.', insertUnorderedList: '•', formatBlock: 'H' };

        return (
            <div ref={ref} className={cn('border border-border rounded-md overflow-hidden bg-background', isDisabled && 'opacity-50 pointer-events-none', className)} {...props}>
                <div {...toolbarProps} className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-muted/30">
                    {tools.map((cmd) => (
                        <button key={cmd} type="button" onClick={() => execCommand(cmd === 'formatBlock' ? 'formatBlock' : cmd, cmd === 'formatBlock' ? 'H2' : undefined)}
                            className={cn('px-2 py-1 rounded text-xs font-medium hover:bg-muted transition-colors', isActive(cmd) && 'bg-primary/10 text-primary')}
                            aria-pressed={isActive(cmd)} aria-label={cmd}>{toolLabels[cmd] || cmd}</button>
                    ))}
                </div>
                <div {...editorProps} className={cn('px-4 py-3 outline-none prose prose-sm max-w-none', editorSizes[size], '[&:empty]:before:content-[attr(aria-placeholder)] [&:empty]:before:text-muted-foreground')} />
                {maxLength && (
                    <div className="px-4 py-1.5 text-xs text-muted-foreground border-t border-border text-right">
                        {characterCount} / {maxLength}
                    </div>
                )}
            </div>
        );
    },
);
RichText.displayName = 'RichText';
export { RichText };
export type { StyledRichTextProps as RichTextProps };
