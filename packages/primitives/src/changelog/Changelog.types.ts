import type React from 'react';
export interface ChangelogEntry { id: string; version: string; date: string; title: string; description?: string; type: 'feature' | 'fix' | 'breaking' | 'improvement'; }
export interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement> { entries: ChangelogEntry[]; title?: string; }
export interface StyledChangelogProps extends ChangelogProps { variant?: 'default' | 'compact'; className?: string; }
