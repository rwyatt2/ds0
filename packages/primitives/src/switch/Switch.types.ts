import type React from 'react';

export interface UseSwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    isDisabled?: boolean;
    id?: string;
}

export interface UseSwitchReturn {
    switchProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    thumbProps: Record<string, string>;
    isChecked: boolean;
    state: 'checked' | 'unchecked';
    fieldId: string;
}

export interface SwitchPrimitiveProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onChange' | 'type' | 'role'>, UseSwitchProps {
    label: string;
    description?: string;
}

export interface StyledSwitchProps extends SwitchPrimitiveProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
