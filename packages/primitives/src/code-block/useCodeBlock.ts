import { useCallback, useState } from 'react';
import type { UseCodeBlockProps, UseCodeBlockReturn } from './CodeBlock.types';

export function useCodeBlock(props: UseCodeBlockProps): UseCodeBlockReturn {
    const { code, language, copyable = true } = props;
    const [isCopied, setIsCopied] = useState(false);

    const copy = useCallback(async () => {
        if (!copyable) return;
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            // Fallback for non-secure contexts
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [code, copyable]);

    return {
        codeBlockProps: {
            role: 'region',
            'aria-label': language ? `Code block: ${language}` : 'Code block',
            tabIndex: 0,
        },
        copyButtonProps: {
            type: 'button' as const,
            'aria-label': isCopied ? 'Copied!' : 'Copy code',
            onClick: copy,
        },
        isCopied,
        copy,
    };
}
