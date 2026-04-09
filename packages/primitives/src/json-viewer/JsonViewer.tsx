import { forwardRef } from 'react';
import type { JsonViewerProps } from './JsonViewer.types';
import { useJsonViewer } from './useJsonViewer';

const JsonNodePrimitive = ({ data, path, depth, expandedPaths, toggleNode, sortKeys }: { data: unknown; path: string; depth: number; expandedPaths: Set<string>; toggleNode: (p: string) => void; sortKeys?: boolean }) => {
    if (data === null) return <span>null</span>;
    if (typeof data === 'boolean') return <span>{String(data)}</span>;
    if (typeof data === 'number') return <span>{data}</span>;
    if (typeof data === 'string') return <span>"{data}"</span>;
    if (typeof data !== 'object') return <span>{String(data)}</span>;

    const isArray = Array.isArray(data);
    const isExpanded = expandedPaths.has(path);
    let entries = isArray ? (data as unknown[]).map((v, i) => [String(i), v] as const) : Object.entries(data as Record<string, unknown>);
    if (sortKeys && !isArray) entries = [...entries].sort((a, b) => a[0].localeCompare(b[0]));
    const count = entries.length;

    return (
        <div role="treeitem" aria-expanded={isExpanded}>
            <span onClick={() => toggleNode(path)} style={{ cursor: 'pointer' }}>
                {isExpanded ? '▼' : '▶'} {isArray ? `Array(${count})` : `{${count}}`}
            </span>
            {isExpanded && (
                <div role="group" style={{ paddingLeft: '1em' }}>
                    {entries.map(([key, value]) => (
                        <div key={key}>
                            <span>{isArray ? key : `"${key}"`}: </span>
                            <JsonNodePrimitive data={value} path={`${path}.${key}`} depth={depth + 1} expandedPaths={expandedPaths} toggleNode={toggleNode} sortKeys={sortKeys} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const JsonViewerPrimitive = forwardRef<HTMLDivElement, JsonViewerProps>(
    ({ data, defaultExpandDepth, sortKeys, copyable, ...rest }, ref) => {
        const { jsonViewerProps, toggleNode, expandedPaths } = useJsonViewer({ data, defaultExpandDepth, sortKeys, copyable });
        return (
            <div ref={ref} {...rest} {...jsonViewerProps}>
                <JsonNodePrimitive data={data} path="$" depth={0} expandedPaths={expandedPaths} toggleNode={toggleNode} sortKeys={sortKeys} />
            </div>
        );
    },
);
JsonViewerPrimitive.displayName = 'JsonViewerPrimitive';
export { JsonViewerPrimitive };
