'use client';

import { Text } from '../../../../components/react/text';
import { Stack } from '../../../../components/react/stack';

export function TextPreview(): React.ReactElement {
    return (
        <Stack gap="3" className="w-full max-w-lg">
            <Text size="lg" weight="semibold">Large semibold text</Text>
            <Text>Default body text — the quick brown fox jumps over the lazy dog.</Text>
            <Text size="sm" color="muted">Small muted text for secondary information.</Text>
            <Text size="xs" color="muted">Extra small caption text.</Text>
            <Text weight="bold">Bold emphasis text.</Text>
            <Text as="span" size="sm" className="italic">Italic span text.</Text>
        </Stack>
    );
}
