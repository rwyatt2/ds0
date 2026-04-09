import type React from 'react';

export interface UseCodeBlockProps {
    /** Code content */ code: string;
    /** Programming language for syntax highlighting */ language?: string;
    /** Whether line numbers are shown */ showLineNumbers?: boolean;
    /** Lines to highlight */ highlightLines?: number[];
    /** Whether the code can be copied */ copyable?: boolean;
}

export interface UseCodeBlockReturn {
    codeBlockProps: React.HTMLAttributes<HTMLPreElement>;
    copyButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    isCopied: boolean;
    copy: () => void;
}

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLPreElement>, 'children'>, UseCodeBlockProps {
    /** Optional title/filename */ title?: string;
}

export interface StyledCodeBlockProps extends CodeBlockProps {
    /** Visual variant */ variant?: 'default' | 'ghost';
    /** Size */ size?: 'sm' | 'md' | 'lg';
    /** Max height before scroll */ maxHeight?: string;
    className?: string;
}
