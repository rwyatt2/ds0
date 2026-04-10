'use client';

import { JsonViewer } from '../../../../components/react/json-viewer';

const sampleData = {
    name: "DS0",
    version: "1.0.0",
    components: 95,
    categories: ["Layout", "Forms", "Data Display", "Navigation", "Feedback"],
    config: {
        theme: "dark",
        responsive: true,
        accessibility: {
            wcag: "2.1 AA",
            ariaSupport: true,
        },
    },
    maintainers: [
        { name: "Alice", role: "Lead" },
        { name: "Bob", role: "Contributor" },
    ],
    isPublic: true,
    deprecated: null,
};

export function JsonViewerPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <JsonViewer
                data={sampleData}
                defaultExpandDepth={2}
                sortKeys
                copyable
            />
        </div>
    );
}
