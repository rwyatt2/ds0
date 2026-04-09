'use client';

import { Progress } from '../../../../components/react/progress';
import { Stack } from '../../../../components/react/stack';
import { Text } from '../../../../components/react/text';

export function ProgressPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <Text size="sm" color="muted" className="mb-2">25% complete</Text>
                <Progress value={25} />
            </div>
            <div>
                <Text size="sm" color="muted" className="mb-2">50% complete</Text>
                <Progress value={50} />
            </div>
            <div>
                <Text size="sm" color="muted" className="mb-2">75% complete</Text>
                <Progress value={75} />
            </div>
            <div>
                <Text size="sm" color="muted" className="mb-2">100% complete</Text>
                <Progress value={100} />
            </div>
        </Stack>
    );
}
