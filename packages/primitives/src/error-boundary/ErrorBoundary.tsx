import React, { Component } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

class ErrorBoundaryPrimitive extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { hasError: true, error }; }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { this.props.onError?.(error, errorInfo); }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return <div role="alert"><h2>Something went wrong</h2><pre>{this.state.error?.message}</pre><button onClick={() => this.setState({ hasError: false, error: null })}>Try Again</button></div>;
        }
        return this.props.children;
    }
}
export { ErrorBoundaryPrimitive };
