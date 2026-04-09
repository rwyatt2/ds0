import type React from 'react';
export interface UseColorPickerProps { value?: string; defaultValue?: string; onChange?: (color: string) => void; format?: 'hex' | 'rgb' | 'hsl'; isDisabled?: boolean; }
export interface UseColorPickerReturn { triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>; isOpen: boolean; toggle: () => void; currentValue: string; setValue: (color: string) => void; }
export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'color' | 'value'> { value?: string; defaultValue?: string; onChange?: (color: string) => void; format?: 'hex' | 'rgb' | 'hsl'; showAlpha?: boolean; swatches?: string[]; isDisabled?: boolean; }
export interface StyledColorPickerProps extends ColorPickerProps { variant?: 'default' | 'inline'; size?: 'sm' | 'md' | 'lg'; className?: string; }
