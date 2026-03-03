import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';

export default function Layout({
    children,
}: {
    children: ReactNode;
}): React.ReactElement {
    return (
        <DocsLayout
            tree={source.pageTree}
            nav={{
                title: (
                    <span className="font-bold">
                        DS<span className="font-mono text-fd-primary">0</span>
                    </span>
                ),
            }}
            sidebar={{
                defaultOpenLevel: 1,
            }}
        >
            {children}
        </DocsLayout>
    );
}
