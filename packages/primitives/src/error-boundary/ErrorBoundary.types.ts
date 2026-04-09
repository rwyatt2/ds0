import type React from 'react';
export interface ErrorBoundaryProps { children: React.ReactNode; fallback?: React.ReactNode; onError?: (error: Error, errorInfo: React.ErrorInfo) => void; }
export interface ErrorBoundaryState { hasError: boolean; error: Error | null; }
export interface StyledErrorBoundaryProps extends ErrorBoundaryProps { variant?: 'default' | 'minimal'; className?: string; }
