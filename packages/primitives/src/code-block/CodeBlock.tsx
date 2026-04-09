import { forwardRef } from 'react';
import type { CodeBlockProps } from './CodeBlock.types';
import { useCodeBlock } from './useCodeBlock';

const CodeBlockPrimitive = forwardRef<HTMLPreElement, CodeBlockProps>(
    ({ code, language, showLineNumbers, highlightLines, copyable, title, ...rest }, ref) => {
        const { codeBlockProps, copyButtonProps, isCopied } = useCodeBlock({ code, language, showLineNumbers, highlightLines, copyable });
        const lines = code.split('\n');
        return (
            <div>
                {title && <div>{title}</div>}
                <pre ref={ref} {...rest} {...codeBlockProps}>
                    <code>
                        {lines.map((line, i) => (
                            <span key={i} data-line={i + 1} data-highlighted={highlightLines?.includes(i + 1) || undefined}>
                                {showLineNumbers && <span>{i + 1}</span>}
                                {line}
                                {i < lines.length - 1 ? '\n' : ''}
                            </span>
                        ))}
                    </code>
                </pre>
                {copyable !== false && <button {...copyButtonProps}>{isCopied ? 'Copied!' : 'Copy'}</button>}
            </div>
        );
    },
);
CodeBlockPrimitive.displayName = 'CodeBlockPrimitive';
export { CodeBlockPrimitive };
