import { useCallback, useRef } from 'react';
import type { UseTerminalProps, UseTerminalReturn } from './Terminal.types';

export function useTerminal(props: UseTerminalProps = {}): UseTerminalReturn {
    const { onInput, readOnly = false, prompt: _prompt = '$' } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback((value: string) => {
        if (readOnly || !value.trim()) return;
        onInput?.(value.trim());
        if (inputRef.current) inputRef.current.value = '';
    }, [onInput, readOnly]);

    return {
        terminalProps: {
            role: 'log',
            'aria-label': 'Terminal output',
            'aria-live': 'polite',
        },
        inputProps: {
            type: 'text',
            'aria-label': 'Terminal input',
            autoComplete: 'off',
            spellCheck: false,
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit(e.currentTarget.value);
                }
            },
        },
        handleSubmit,
    };
}
