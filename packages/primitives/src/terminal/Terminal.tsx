import { forwardRef } from 'react';
import type { TerminalProps } from './Terminal.types';
import { useTerminal } from './useTerminal';

const TerminalPrimitive = forwardRef<HTMLDivElement, TerminalProps>(
    ({ lines = [], onInput, readOnly, prompt = '$', title, ...rest }, ref) => {
        const { terminalProps, inputProps } = useTerminal({ lines, onInput, readOnly, prompt });
        return (
            <div ref={ref} {...rest}>
                {title && <div>{title}</div>}
                <div {...terminalProps}>
                    {lines.map((line, i) => (
                        <div key={i}>{line.type === 'input' ? `${line.prompt || prompt} ${line.content}` : line.content}</div>
                    ))}
                </div>
                {!readOnly && <div>{prompt} <input {...inputProps} /></div>}
            </div>
        );
    },
);
TerminalPrimitive.displayName = 'TerminalPrimitive';
export { TerminalPrimitive };
