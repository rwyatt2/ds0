import { useCallback, useState } from 'react';
import type { UseJsonViewerProps, UseJsonViewerReturn } from './JsonViewer.types';

function getAllPaths(data: unknown, prefix = ''): string[] {
    const paths: string[] = [];
    if (data && typeof data === 'object') {
        paths.push(prefix || '$');
        const entries = Array.isArray(data) ? data.map((v, i) => [String(i), v] as const) : Object.entries(data as Record<string, unknown>);
        for (const [key, value] of entries) {
            const path = prefix ? `${prefix}.${key}` : `$.${key}`;
            paths.push(...getAllPaths(value, path));
        }
    }
    return paths;
}

export function useJsonViewer(props: UseJsonViewerProps): UseJsonViewerReturn {
    const { data, defaultExpandDepth = 1 } = props;

    const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        function expand(d: unknown, path: string, depth: number) {
            if (depth >= defaultExpandDepth || !d || typeof d !== 'object') return;
            initial.add(path);
            const entries = Array.isArray(d) ? d.map((v, i) => [String(i), v] as const) : Object.entries(d as Record<string, unknown>);
            for (const [key, value] of entries) expand(value, `${path}.${key}`, depth + 1);
        }
        expand(data, '$', 0);
        return initial;
    });

    const toggleNode = useCallback((path: string) => {
        setExpandedPaths(prev => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path); else next.add(path);
            return next;
        });
    }, []);

    const expandAll = useCallback(() => setExpandedPaths(new Set(getAllPaths(data))), [data]);
    const collapseAll = useCallback(() => setExpandedPaths(new Set<string>()), []);

    return {
        jsonViewerProps: { role: 'tree', 'aria-label': 'JSON viewer' },
        toggleNode, expandAll, collapseAll, expandedPaths,
    };
}
