'use client';

import { Rating } from '../../../../components/react/rating';
import { Stack } from '../../../../components/react/stack';

export function RatingPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Interactive</p>
                <Rating defaultValue={3} />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Read-only with half stars</p>
                <Rating value={3.5} isReadonly allowHalf />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack gap="2">
                    <Rating defaultValue={4} size="sm" />
                    <Rating defaultValue={4} size="md" />
                    <Rating defaultValue={4} size="lg" />
                </Stack>
            </div>
        </Stack>
    );
}
