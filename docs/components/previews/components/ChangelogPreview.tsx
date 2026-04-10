'use client';

import { Changelog } from '../../../../components/react/changelog';

const entries = [
    {
        id: '1',
        version: 'v1.2.0',
        title: 'Command Palette & Color Picker',
        date: 'Apr 9, 2026',
        type: 'feature' as const,
        description: 'Added CommandPalette (⌘K) and ColorPicker components with full accessibility support.',
    },
    {
        id: '2',
        version: 'v1.1.1',
        title: 'Calendar ARIA fix',
        date: 'Apr 5, 2026',
        type: 'fix' as const,
        description: 'Resolved keyboard navigation and screen reader announcements in the Calendar component.',
    },
    {
        id: '3',
        version: 'v1.1.0',
        title: 'DataTable overhaul',
        date: 'Mar 28, 2026',
        type: 'feature' as const,
        description: 'DataTable now supports column sorting, row selection, and built-in pagination.',
    },
    {
        id: '4',
        version: 'v1.0.0',
        title: 'Initial release',
        date: 'Mar 1, 2026',
        type: 'breaking' as const,
        description: 'First stable release of DS0 with 95 components and full documentation.',
    },
];

export function ChangelogPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <Changelog entries={entries} />
        </div>
    );
}
