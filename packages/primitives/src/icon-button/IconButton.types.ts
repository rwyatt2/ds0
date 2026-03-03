import type React from 'react';

export interface UseIconButtonProps {
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
}

export interface UseIconButtonReturn {
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface IconButtonPrimitiveProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    UseIconButtonProps {
    /** The icon element */
    icon: React.ReactNode;
    /** Accessible name (REQUIRED) */
    'aria-label': string;
}

export interface StyledIconButtonProps extends IconButtonPrimitiveProps {
    variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
