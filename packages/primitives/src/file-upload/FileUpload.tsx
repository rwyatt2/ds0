import React, { forwardRef } from 'react';
import { useFileUpload } from './useFileUpload';
import type { FileUploadProps } from './FileUpload.types';
const FileUploadPrimitive = forwardRef<HTMLDivElement, FileUploadProps>(
    ({ accept, maxFiles, maxSize, multiple, onFilesChange, isDisabled, children, ...props }, ref) => {
        const { dropzoneProps, inputProps } = useFileUpload({ accept, maxFiles, maxSize, multiple, onFilesChange, isDisabled });
        return (<div ref={ref} {...props}><div {...dropzoneProps}>{children || 'Drop files here or click to browse'}</div><input {...inputProps} /></div>);
    },
);
FileUploadPrimitive.displayName = 'FileUploadPrimitive';
export { FileUploadPrimitive };
