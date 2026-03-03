import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

/**
 * Props for the useRadioGroup hook.
 */
export interface UseRadioGroupProps {
    /** Controlled selected value */
    value?: string;
    /** Default value for uncontrolled mode */
    defaultValue?: string;
    /** Called when the selected value changes */
    onValueChange?: (value: string) => void;
    /** Layout direction */
    orientation?: 'vertical' | 'horizontal';
    /** Whether the entire group is disabled */
    isDisabled?: boolean;
    /** Whether a selection is required */
    isRequired?: boolean;
}

/**
 * Return value of the useRadioGroup hook.
 */
export interface UseRadioGroupReturn {
    /** Props to spread onto the group container */
    groupProps: React.HTMLAttributes<HTMLDivElement>;
    /** Currently selected value */
    selectedValue: string | undefined;
    /** Get props for an individual radio item */
    getItemProps: (props: RadioItemHookProps) => React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Props passed to getItemProps.
 */
export interface RadioItemHookProps {
    /** Value this item represents */
    value: string;
    /** Whether this item is disabled */
    isDisabled?: boolean;
}

// ─── Context ─────────────────────────────────────────────────

/**
 * Values shared via RadioGroup context.
 */
export interface RadioGroupContextValue {
    /** Currently selected value */
    selectedValue: string | undefined;
    /** Handler to select a value */
    onSelect: (value: string) => void;
    /** Whether the group is disabled */
    isDisabled: boolean;
    /** Whether the group is required */
    isRequired: boolean;
    /** Unique name for the radio group */
    name: string;
    /** Layout orientation */
    orientation: 'vertical' | 'horizontal';
}

// ─── Component Props ─────────────────────────────────────────

/**
 * Props for the RadioGroup root primitive.
 */
export interface RadioGroupPrimitiveProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'>,
    UseRadioGroupProps {
    /** Accessible label for the group */
    label: string;
    /** Error state */
    isInvalid?: boolean;
    /** Error message text */
    errorMessage?: string;
    /** Radio items */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the RadioGroup.Item primitive.
 */
export interface RadioGroupItemPrimitiveProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    /** Value this item represents */
    value: string;
    /** Visible label for this option */
    label: string;
    /** Optional description below the label */
    description?: string;
    /** Whether this item is disabled */
    isDisabled?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Children override for custom content */
    children?: React.ReactNode;
}

// ─── Styled Props ────────────────────────────────────────────

/**
 * Props for the styled RadioGroup component.
 */
export interface StyledRadioGroupProps extends RadioGroupPrimitiveProps {
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Props for the styled RadioGroup.Item component.
 */
export interface StyledRadioGroupItemProps extends RadioGroupItemPrimitiveProps {
    /** Size variant (inherited from parent, can be overridden) */
    size?: 'sm' | 'md' | 'lg';
}
