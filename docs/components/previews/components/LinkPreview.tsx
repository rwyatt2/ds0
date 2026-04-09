'use client';

import { Link } from '../../../../components/react/link';
import { Stack } from '../../../../components/react/stack';

export function LinkPreview(): React.ReactElement {
    return (
        <Stack gap="3" className="w-full max-w-lg">
            <Link href="#">Default link</Link>
            <Link href="#" variant="muted">Muted link</Link>
            <Link href="#" size="sm">Small link</Link>
            <Link href="#" size="lg">Large link</Link>
            <Stack direction="horizontal" gap="4">
                <Link href="#">Home</Link>
                <Link href="#">About</Link>
                <Link href="#">Contact</Link>
            </Stack>
        </Stack>
    );
}
