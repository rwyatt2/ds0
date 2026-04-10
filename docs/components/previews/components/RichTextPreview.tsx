'use client';

import { RichText } from '../../../../components/react/rich-text';

export function RichTextPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <RichText
                placeholder="Start typing your content..."
                defaultValue="<p><strong>DS0</strong> is a comprehensive design system with <em>95+ components</em>.</p><p>Try the toolbar above to format text — <u>bold</u>, <em>italic</em>, lists, and more.</p>"
            />
        </div>
    );
}
