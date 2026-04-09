import type React from 'react';

export interface UseJsonViewerProps {
    /** JSON data to display */ data: unknown;
    /** Default expanded depth */ defaultExpandDepth?: number;
    /** Whether to sort keys alphabetically */ sortKeys?: boolean;
    /** Whether values are copyable on click */ copyable?: boolean;
}

export interface UseJsonViewerReturn {
    jsonViewerProps: React.HTMLAttributes<HTMLDivElement>;
    toggleNode: (path: string) => void;
    expandAll: () => void;
    collapseAll: () => void;
    expandedPaths: Set<string>;
}

export interface JsonViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseJsonViewerProps {}

export interface StyledJsonViewerProps extends JsonViewerProps {
    /** Visual variant */ variant?: 'default' | 'dark';
    /** Size */ size?: 'sm' | 'md' | 'lg';
    /** Max height */ maxHeight?: string;
    className?: string;
}
