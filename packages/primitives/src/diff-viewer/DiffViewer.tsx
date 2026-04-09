import { forwardRef } from 'react';
import type { DiffViewerProps } from './DiffViewer.types';
import { useDiffViewer } from './useDiffViewer';

const DiffViewerPrimitive = forwardRef<HTMLDivElement, DiffViewerProps>(
    ({ oldValue, newValue, mode, context, title, ...rest }, ref) => {
        const { diffViewerProps, lines, stats } = useDiffViewer({ oldValue, newValue, mode, context });
        return (
            <div ref={ref} {...rest} {...diffViewerProps}>
                {title && <div>{title}</div>}
                <div>+{stats.added} -{stats.removed}</div>
                <pre>{lines.map((l, i) => <div key={i}>{l.type === 'add' ? '+' : l.type === 'remove' ? '-' : ' '} {l.content}</div>)}</pre>
            </div>
        );
    },
);
DiffViewerPrimitive.displayName = 'DiffViewerPrimitive';
export { DiffViewerPrimitive };
