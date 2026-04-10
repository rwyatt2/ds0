import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useTreeView } from '@ds0/primitives';
import type { StyledTreeViewProps, TreeNodeData } from '@ds0/primitives';

const indents = { sm: 'pl-4', md: 'pl-6', lg: 'pl-8' };
const textSizes = { sm: 'text-xs py-0.5', md: 'text-sm py-1', lg: 'text-base py-1.5' };

const TreeView = forwardRef<HTMLDivElement, StyledTreeViewProps>(
    ({ className, variant = 'default', size = 'md', data, expandedKeys, defaultExpandedKeys, selectedKeys, onExpandedChange, onSelectedChange, selectionMode, renderNode, ...props }, ref) => {
        const tree = useTreeView({ data, expandedKeys, defaultExpandedKeys, selectedKeys, onExpandedChange, onSelectedChange, selectionMode });
        const renderNodes = (nodes: TreeNodeData[], level: number): React.ReactNode => (
            <ul role="group" className={level > 1 ? cn(indents[size], variant === 'default' && 'border-l border-border ml-2') : undefined}>
                {nodes.map((node, i) => (
                    <li key={node.key} {...tree.getNodeProps(node, level, i, nodes.length)}>
                        <div className={cn('flex items-center gap-1.5 rounded-md px-2 cursor-pointer hover:bg-muted transition-colors', textSizes[size], tree.selectedKeys.includes(node.key) && 'bg-primary/10 text-primary')}
                            onClick={(e) => { e.stopPropagation(); if (node.children?.length) tree.toggleExpand(node.key); tree.toggleSelect(node.key); }}>
                            {node.children?.length ? (<span className={cn('text-muted-foreground transition-transform', tree.expandedKeys.includes(node.key) && 'rotate-90')}>▶</span>) : <span className="w-3" />}
                            {renderNode ? renderNode(node) : <span>{node.label}</span>}
                        </div>
                        {node.children?.length && tree.expandedKeys.includes(node.key) ? renderNodes(node.children, level + 1) : null}
                    </li>
                ))}
            </ul>
        );
        return (<div ref={ref} className={cn('', className)} {...tree.treeProps} {...props}>{renderNodes(data, 1)}</div>);
    },
);
TreeView.displayName = 'TreeView';
export { TreeView };
export type { StyledTreeViewProps as TreeViewProps };
