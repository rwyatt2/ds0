import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useFileUpload } from '@ds0/primitives';
import type { StyledFileUploadProps } from '@ds0/primitives';

const dropzoneSizes = { sm: 'py-4', md: 'py-8', lg: 'py-12' };

const FileUpload = forwardRef<HTMLDivElement, StyledFileUploadProps>(
    ({ className, variant = 'dropzone', size = 'md', accept, maxFiles, maxSize, multiple, onFilesChange, isDisabled, children, ...props }, ref) => {
        const { dropzoneProps, inputProps, files, isDragOver, removeFile, errors } = useFileUpload({ accept, maxFiles, maxSize, multiple, onFilesChange, isDisabled });
        return (
            <div ref={ref} className={cn('inline-flex flex-col gap-3 w-full', className)} {...props}>
                {variant === 'dropzone' ? (
                    <div {...dropzoneProps} className={cn('flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors cursor-pointer text-muted-foreground', dropzoneSizes[size], isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}>
                        <span className="text-2xl mb-2">⬆</span>
                        <span className="text-sm font-medium">Drag & drop files here, or click to browse</span>
                        {accept && <span className="text-xs mt-1 opacity-70">Accepted: {accept}{maxSize ? ` (max ${(maxSize / 1024 / 1024).toFixed(0)}MB)` : ''}</span>}
                    </div>
                ) : (
                    <button type="button" {...dropzoneProps} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-sm font-medium hover:bg-muted">
                        📎 Choose file{multiple ? 's' : ''}
                    </button>
                )}
                <input {...inputProps} />
                {errors.length > 0 && <div className="text-destructive text-xs" aria-live="polite">{errors.map((e, i) => <div key={i}>{e}</div>)}</div>}
                {files.length > 0 && (
                    <ul className="space-y-1.5" aria-live="polite">
                        {files.map((f, i) => (
                            <li key={i} className="flex items-center justify-between px-3 py-2 rounded-md border border-border bg-background text-sm">
                                <span className="flex items-center gap-2"><span>📄</span>{f.name} <span className="text-xs text-muted-foreground">({(f.size / 1024).toFixed(1)}KB)</span></span>
                                <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${f.name}`}>✕</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    },
);
FileUpload.displayName = 'FileUpload';
export { FileUpload };
export type { StyledFileUploadProps as FileUploadProps };
