import { useCallback, useRef, useState } from 'react';
import type { UseRichTextProps, UseRichTextReturn } from './RichText.types';

export function useRichText(props: UseRichTextProps = {}): UseRichTextReturn {
    const { value, defaultValue = '', onChange, onTextChange, placeholder, maxLength, isDisabled = false, isReadOnly = false } = props;
    const editorRef = useRef<HTMLDivElement>(null);
    const [charCount, setCharCount] = useState(0);

    const handleInput = useCallback(() => {
        if (!editorRef.current) return;
        const html = editorRef.current.innerHTML;
        const text = editorRef.current.textContent || '';
        setCharCount(text.length);
        if (maxLength && text.length > maxLength) return;
        onChange?.(html);
        onTextChange?.(text);
    }, [onChange, onTextChange, maxLength]);

    const execCommand = useCallback((command: string, val?: string) => {
        if (isDisabled || isReadOnly) return;
        document.execCommand(command, false, val);
        editorRef.current?.focus();
        handleInput();
    }, [isDisabled, isReadOnly, handleInput]);

    const isActive = useCallback((command: string): boolean => {
        try { return document.queryCommandState(command); } catch { return false; }
    }, []);

    return {
        editorRef,
        editorProps: {
            role: 'textbox' as const,
            'aria-multiline': true,
            'aria-label': 'Rich text editor',
            'aria-disabled': isDisabled || undefined,
            'aria-readonly': isReadOnly || undefined,
            'aria-placeholder': placeholder,
            contentEditable: !isDisabled && !isReadOnly,
            suppressContentEditableWarning: true,
            onInput: handleInput,
            dangerouslySetInnerHTML: value !== undefined ? { __html: value } : { __html: defaultValue },
        },
        toolbarProps: { role: 'toolbar' as const, 'aria-label': 'Formatting tools' },
        execCommand,
        isActive,
        characterCount: charCount,
    };
}
