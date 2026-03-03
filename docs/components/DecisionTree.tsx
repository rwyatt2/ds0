interface TreeNode {
    condition: string;
    yes: string | TreeNode | TreeNode[];
    no: string | TreeNode | TreeNode[];
}

interface DecisionTreeProps {
    tree: TreeNode[];
}

export function DecisionTree({ tree }: DecisionTreeProps): React.ReactElement {
    return (
        <div className="my-6 rounded-lg border bg-fd-muted/30 p-6">
            <h4 className="mb-4 text-sm font-semibold">Decision Guide</h4>
            <TreeBranch nodes={tree} depth={0} />
        </div>
    );
}

function TreeBranch({
    nodes,
    depth,
}: {
    nodes: TreeNode[];
    depth: number;
}): React.ReactElement {
    return (
        <div
            className={`space-y-3 ${depth > 0 ? 'ml-6 border-l pl-4' : ''}`}
        >
            {nodes.map((node, i) => (
                <div key={i}>
                    <p className="text-sm font-medium">{node.condition}</p>
                    <div className="mt-1 ml-4 space-y-1">
                        <div className="flex items-start gap-2">
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800">
                                Yes
                            </span>
                            {typeof node.yes === 'string' ? (
                                <span className="text-sm">{node.yes}</span>
                            ) : (
                                <TreeBranch
                                    nodes={Array.isArray(node.yes) ? node.yes : [node.yes]}
                                    depth={depth + 1}
                                />
                            )}
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800">
                                No
                            </span>
                            {typeof node.no === 'string' ? (
                                <span className="text-sm">{node.no}</span>
                            ) : (
                                <TreeBranch
                                    nodes={Array.isArray(node.no) ? node.no : [node.no]}
                                    depth={depth + 1}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
