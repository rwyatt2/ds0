import React, { forwardRef } from 'react';
import { useTreeView } from './useTreeView';
import type { TreeViewProps, TreeNodeData } from './TreeView.types';

const TreeViewPrimitive = forwardRef<HTMLDivElement, TreeViewProps>(
    ({ data, expandedKeys, defaultExpandedKeys, selectedKeys, onExpandedChange, onSelectedChange, selectionMode, renderNode, ...props }, ref) => {
        const tree = useTreeView({ data, expandedKeys, defaultExpandedKeys, selectedKeys, onExpandedChange, onSelectedChange, selectionMode });
        const renderNodes = (nodes: TreeNodeData[], level: number) => (
            <ul role={level === 1 ? undefined : 'group'}>{nodes.map((node, i) => (
                <li key={node.key} {...tree.getNodeProps(node, level, i, nodes.length)}
                    onClick={(e) => { e.stopPropagation(); if (node.children?.length) tree.toggleExpand(node.key); tree.toggleSelect(node.key); }}>
                    {renderNode ? renderNode(node) : node.label}
                    {node.children?.length && tree.expandedKeys.includes(node.key) ? renderNodes(node.children, level + 1) : null}
                </li>
            ))}</ul>
        );
        return (<div ref={ref} {...tree.treeProps} {...props}>{renderNodes(data, 1)}</div>);
    },
);
TreeViewPrimitive.displayName = 'TreeViewPrimitive';
export { TreeViewPrimitive };
