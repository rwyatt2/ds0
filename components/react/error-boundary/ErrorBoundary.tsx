import React, { Component } from 'react';
import { cn } from '@ds0/primitives';
import type { StyledErrorBoundaryProps, ErrorBoundaryState } from '@ds0/primitives';
class ErrorBoundary extends Component<StyledErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: StyledErrorBoundaryProps) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { hasError: true, error }; }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { this.props.onError?.(error, errorInfo); }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div role="alert" className={cn('rounded-lg border p-6 text-center', this.props.variant === 'minimal' ? '' : 'bg-destructive/5 border-destructive/20', this.props.className)}>
                    <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-destructive"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
                    <h3 className="font-semibold text-lg mb-1">Something went wrong</h3>
                    <p className="text-sm text-muted-foreground mb-4">{this.state.error?.message}</p>
                    <button onClick={() => this.setState({ hasError: false, error: null })} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">Try Again</button>
                </div>
            );
        }
        return this.props.children;
    }
}
export { ErrorBoundary };
export type { StyledErrorBoundaryProps as ErrorBoundaryProps };
