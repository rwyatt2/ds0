export interface UseTagProps {
    /** Whether the tag can be removed */
    isRemovable?: boolean;
    /** Whether the tag is disabled */
    isDisabled?: boolean;
    /** Remove callback */
    onRemove?: () => void;
}

export interface UseTagReturn {
    /** Props for the remove button */
    removeButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-label'?: string };
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, UseTagProps {
    /** Tag content */
    children: React.ReactNode;
}

export interface StyledTagProps extends Omit<TagProps, 'size'> {
    /** Visual variant */
    variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline';
    /** Tag size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
