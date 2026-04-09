import type React from 'react';

export interface DiffLine { type: 'add' | 'remove' | 'context'; content: string; oldLineNumber?: number; newLineNumber?: number; }

export interface UseDiffViewerProps { oldValue: string; newValue: string; mode?: 'unified' | 'split'; context?: number; }
export interface UseDiffViewerReturn { diffViewerProps: React.HTMLAttributes<HTMLDivElement>; lines: DiffLine[]; stats: { added: number; removed: number; }; }

export interface DiffViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseDiffViewerProps { title?: string; oldTitle?: string; newTitle?: string; }
export interface StyledDiffViewerProps extends DiffViewerProps { variant?: 'default' | 'dark'; size?: 'sm' | 'md' | 'lg'; maxHeight?: string; className?: string; }
