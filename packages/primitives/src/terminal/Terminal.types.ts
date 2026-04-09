import type React from 'react';

export interface TerminalLine { type: 'input' | 'output' | 'error'; content: string; prompt?: string; }
export interface UseTerminalProps { lines?: TerminalLine[]; onInput?: (input: string) => void; readOnly?: boolean; prompt?: string; }
export interface UseTerminalReturn { terminalProps: React.HTMLAttributes<HTMLDivElement>; inputProps: React.InputHTMLAttributes<HTMLInputElement>; handleSubmit: (value: string) => void; }

export interface TerminalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseTerminalProps { title?: string; }
export interface StyledTerminalProps extends TerminalProps { variant?: 'default' | 'light'; size?: 'sm' | 'md' | 'lg'; maxHeight?: string; className?: string; }
