'use client';

import { Heading } from '../../../../components/react/heading';
import { Stack } from '../../../../components/react/stack';

export function HeadingPreview(): React.ReactElement {
    return (
        <Stack gap="3" className="w-full max-w-lg">
            <Heading as="h1">Heading Level 1</Heading>
            <Heading as="h2">Heading Level 2</Heading>
            <Heading as="h3">Heading Level 3</Heading>
            <Heading as="h4">Heading Level 4</Heading>
            <Heading as="h5">Heading Level 5</Heading>
            <Heading as="h6">Heading Level 6</Heading>
        </Stack>
    );
}
