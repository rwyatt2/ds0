import { useCallback, useState } from 'react';
import type { UseTreeViewProps, UseTreeViewReturn, TreeNodeData } from './TreeView.types';

export function useTreeView(props: UseTreeViewProps): UseTreeViewReturn {
    const { data, expandedKeys: controlledExpanded, defaultExpandedKeys = [], selectedKeys: controlledSelected, onExpandedChange, onSelectedChange, selectionMode = 'none' } = props;
    const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpandedKeys);
    const [internalSelected, setInternalSelected] = useState<string[]>([]);
    const expandedKeys = controlledExpanded ?? internalExpanded;
    const selectedKeys = controlledSelected ?? internalSelected;

    const toggleExpand = useCallback((key: string) => {
        const next = expandedKeys.includes(key) ? expandedKeys.filter((k) => k !== key) : [...expandedKeys, key];
        if (onExpandedChange) onExpandedChange(next); else setInternalExpanded(next);
    }, [expandedKeys, onExpandedChange]);

    const toggleSelect = useCallback((key: string) => {
        if (selectionMode === 'none') return;
        let next: string[];
        if (selectionMode === 'single') { next = selectedKeys.includes(key) ? [] : [key]; }
        else { next = selectedKeys.includes(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key]; }
        if (onSelectedChange) onSelectedChange(next); else setInternalSelected(next);
    }, [selectionMode, selectedKeys, onSelectedChange]);

    const getNodeProps = useCallback((node: TreeNodeData, level: number, position: number, setSize: number) => ({
        role: 'treeitem', 'aria-level': level, 'aria-setsize': setSize, 'aria-posinset': position + 1,
        'aria-expanded': node.children?.length ? expandedKeys.includes(node.key) : undefined,
        'aria-selected': selectionMode !== 'none' ? selectedKeys.includes(node.key) : undefined,
    }), [expandedKeys, selectedKeys, selectionMode]);

    return { treeProps: { role: 'tree' }, expandedKeys, selectedKeys, toggleExpand, toggleSelect, getNodeProps };
}
