'use client';

import { FileUpload } from '../../../../components/react/file-upload';
import { Stack } from '../../../../components/react/stack';

export function FileUploadPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-md">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Dropzone</p>
                <FileUpload
                    variant="dropzone"
                    accept=".png,.jpg,.svg"
                    maxFiles={5}
                    maxSize={5 * 1024 * 1024}
                    multiple
                />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Button variant</p>
                <FileUpload variant="button" accept=".pdf,.docx" />
            </div>
        </Stack>
    );
}
