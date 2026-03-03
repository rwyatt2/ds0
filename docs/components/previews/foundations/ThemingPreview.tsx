'use client';

import { useState } from 'react';

const themes = [
    {
        name: 'Default',
        primary: '#2563eb',
        primaryFg: '#ffffff',
        bg: '#ffffff',
        fg: '#0f172a',
        muted: '#f1f5f9',
        mutedFg: '#64748b',
        border: '#e2e8f0',
    },
    {
        name: 'Enterprise',
        primary: '#1e293b',
        primaryFg: '#ffffff',
        bg: '#ffffff',
        fg: '#0f172a',
        muted: '#f8fafc',
        mutedFg: '#64748b',
        border: '#e2e8f0',
    },
    {
        name: 'Sunset',
        primary: '#ea580c',
        primaryFg: '#ffffff',
        bg: '#fffbeb',
        fg: '#292524',
        muted: '#fef3c7',
        mutedFg: '#78716c',
        border: '#fed7aa',
    },
];

export function ThemingPreview(): React.ReactElement {
    const [activeIdx, setActiveIdx] = useState(0);
    const t = themes[activeIdx];

    return (
        <div className="w-full max-w-md space-y-4">
            <div className="flex gap-2">
                {themes.map((theme, i) => (
                    <button
                        key={theme.name}
                        type="button"
                        onClick={() => setActiveIdx(i)}
                        className={`h-8 px-3 text-xs font-medium rounded-md border transition-colors ${activeIdx === i
                                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-600'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
            {/* Preview card */}
            <div className="rounded-lg border overflow-hidden shadow-sm" style={{ borderColor: t.border, backgroundColor: t.bg }}>
                <div className="p-4 border-b" style={{ borderColor: t.border }}>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded" style={{ backgroundColor: t.primary }} />
                        <span className="text-sm font-semibold" style={{ color: t.fg }}>Sample Card</span>
                    </div>
                    <p className="text-xs" style={{ color: t.mutedFg }}>Theme: {t.name}</p>
                </div>
                <div className="p-4" style={{ backgroundColor: t.muted }}>
                    <p className="text-sm mb-3" style={{ color: t.fg }}>This is how content looks with the selected theme.</p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="h-8 px-3 text-xs font-medium rounded-md transition-colors"
                            style={{ backgroundColor: t.primary, color: t.primaryFg }}
                        >
                            Primary
                        </button>
                        <button
                            type="button"
                            className="h-8 px-3 text-xs font-medium rounded-md border"
                            style={{ borderColor: t.border, color: t.fg }}
                        >
                            Secondary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
