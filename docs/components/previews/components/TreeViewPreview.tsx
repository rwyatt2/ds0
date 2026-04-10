'use client';

import { TreeView } from '../../../../components/react/tree-view';

const treeData = [
    {
        key: 'src',
        label: 'src',
        children: [
            {
                key: 'components',
                label: 'components',
                children: [
                    { key: 'button', label: 'Button.tsx' },
                    { key: 'input', label: 'Input.tsx' },
                    { key: 'dialog', label: 'Dialog.tsx' },
                ],
            },
            {
                key: 'hooks',
                label: 'hooks',
                children: [
                    { key: 'useTheme', label: 'useTheme.ts' },
                    { key: 'useMediaQuery', label: 'useMediaQuery.ts' },
                ],
            },
            { key: 'index', label: 'index.ts' },
        ],
    },
    {
        key: 'public',
        label: 'public',
        children: [
            { key: 'favicon', label: 'favicon.ico' },
        ],
    },
    { key: 'package', label: 'package.json' },
    { key: 'tsconfig', label: 'tsconfig.json' },
];

export function TreeViewPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <TreeView
                data={treeData}
                defaultExpandedKeys={['src', 'components']}
                selectionMode="single"
            />
        </div>
    );
}
