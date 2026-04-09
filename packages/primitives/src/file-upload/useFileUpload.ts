import { useCallback, useRef, useState } from 'react';
import type { UseFileUploadProps, UseFileUploadReturn } from './FileUpload.types';

export function useFileUpload(props: UseFileUploadProps = {}): UseFileUploadReturn {
    const { accept, maxFiles, maxSize, multiple = false, onFilesChange, isDisabled = false } = props;
    const [files, setFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const validate = useCallback((newFiles: File[]): { valid: File[]; errs: string[] } => {
        const errs: string[] = []; const valid: File[] = [];
        for (const f of newFiles) {
            if (maxSize && f.size > maxSize) { errs.push(`${f.name} exceeds max size`); continue; }
            if (accept) { const types = accept.split(',').map((t) => t.trim()); const ext = `.${f.name.split('.').pop()}`; if (!types.some((t) => t === f.type || t === ext || (t.endsWith('/*') && f.type.startsWith(t.replace('/*', '/'))))) { errs.push(`${f.name} is not an accepted file type`); continue; } }
            valid.push(f);
        }
        return { valid, errs };
    }, [accept, maxSize]);

    const addFiles = useCallback((newFiles: FileList | File[]) => {
        if (isDisabled) return;
        const arr = Array.from(newFiles);
        const { valid, errs } = validate(arr);
        setErrors(errs);
        const updated = multiple ? [...files, ...valid] : valid.slice(0, 1);
        const final = maxFiles ? updated.slice(0, maxFiles) : updated;
        setFiles(final);
        onFilesChange?.(final);
    }, [isDisabled, files, multiple, maxFiles, validate, onFilesChange]);

    const removeFile = useCallback((index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onFilesChange?.(updated);
    }, [files, onFilesChange]);

    const openFileBrowser = useCallback(() => { inputRef.current?.click(); }, []);

    return {
        dropzoneProps: {
            role: 'button' as const, tabIndex: 0, 'aria-label': 'Upload files', 'aria-disabled': isDisabled || undefined,
            onClick: openFileBrowser,
            onDragOver: (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); },
            onDragLeave: () => setIsDragOver(false),
            onDrop: (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); addFiles(e.dataTransfer.files); },
            onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileBrowser(); } },
        },
        inputProps: { type: 'hidden', ref: inputRef as React.RefObject<HTMLInputElement>, accept, multiple, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) addFiles(e.target.files); } },
        files, isDragOver, addFiles, removeFile, openFileBrowser, errors,
    };
}
