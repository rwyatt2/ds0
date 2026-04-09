import React, { Component } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '@ds0/primitives';
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { hasError: true, error }; }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { this.props.onError?.(error, errorInfo); }
    render() { if (this.state.hasError) return this.props.fallback || <View style={{ padding: 24, alignItems: 'center' }}><Text style={{ fontWeight: '600', fontSize: 16 }}>Something went wrong</Text><Text style={{ color: '#6b7280', marginTop: 4 }}>{this.state.error?.message}</Text><Pressable onPress={() => this.setState({ hasError: false, error: null })} style={{ marginTop: 16, backgroundColor: '#3b82f6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 }}><Text style={{ color: 'white' }}>Try Again</Text></Pressable></View>; return this.props.children; }
}
export { ErrorBoundary };
