import type React from 'react';
export interface UseFileUploadProps { accept?: string; maxFiles?: number; maxSize?: number; multiple?: boolean; onFilesChange?: (files: File[]) => void; isDisabled?: boolean; }
export interface UseFileUploadReturn { dropzoneProps: React.HTMLAttributes<HTMLDivElement>; inputProps: React.InputHTMLAttributes<HTMLInputElement>; files: File[]; isDragOver: boolean; addFiles: (files: FileList | File[]) => void; removeFile: (index: number) => void; openFileBrowser: () => void; errors: string[]; }
export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> { accept?: string; maxFiles?: number; maxSize?: number; multiple?: boolean; onFilesChange?: (files: File[]) => void; isDisabled?: boolean; children?: React.ReactNode; }
export interface StyledFileUploadProps extends FileUploadProps { variant?: 'dropzone' | 'button'; size?: 'sm' | 'md' | 'lg'; className?: string; }
