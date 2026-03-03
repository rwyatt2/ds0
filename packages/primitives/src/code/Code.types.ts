import type React from 'react';

export interface UseCodeProps {
    variant?: 'inline' | 'block';
}

export interface UseCodeReturn {
    codeProps: React.HTMLAttributes<HTMLElement>;
    isBlock: boolean;
}

export interface CodePrimitiveProps
    extends React.HTMLAttributes<HTMLElement>,
    UseCodeProps {
    children: React.ReactNode;
}

export interface StyledCodeProps extends CodePrimitiveProps {
    className?: string;
}
