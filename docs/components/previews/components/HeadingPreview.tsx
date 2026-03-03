'use client';

export function HeadingPreview(): React.ReactElement {
    const headings = [
        { tag: 'h1', size: '3xl', weight: 'bold', text: 'Heading 1 — Page Title' },
        { tag: 'h2', size: '2xl', weight: 'semibold', text: 'Heading 2 — Section' },
        { tag: 'h3', size: 'xl', weight: 'semibold', text: 'Heading 3 — Subsection' },
        { tag: 'h4', size: 'lg', weight: 'semibold', text: 'Heading 4 — Group' },
        { tag: 'h5', size: 'base', weight: 'medium', text: 'Heading 5 — Label' },
        { tag: 'h6', size: 'sm', weight: 'medium', text: 'Heading 6 — Overline' },
    ];

    return (
        <div className="w-full max-w-lg space-y-3">
            {headings.map((h) => (
                <div key={h.tag} className="flex items-baseline gap-3">
                    <span className="w-8 text-right text-xs font-mono text-gray-400 dark:text-gray-500 shrink-0">
                        {h.tag}
                    </span>
                    <span
                        className={`text-gray-900 dark:text-gray-100`}
                        style={{
                            fontSize: { '3xl': '30px', '2xl': '24px', xl: '20px', lg: '18px', base: '16px', sm: '14px' }[h.size],
                            fontWeight: h.weight === 'bold' ? 700 : h.weight === 'semibold' ? 600 : 500,
                        }}
                    >
                        {h.text}
                    </span>
                </div>
            ))}
        </div>
    );
}
