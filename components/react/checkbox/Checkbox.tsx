import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useCheckbox } from '@ds0/primitives';
import type { StyledCheckboxProps } from '@ds0/primitives';

import { Label } from '../label';

const checkboxVariants = cva(
    'shrink-0 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
    {
        variants: {
            size: {
                sm: 'h-4 w-4',
                md: 'h-5 w-5',
                lg: 'h-6 w-6',
            },
            state: {
                default: 'border-input',
                invalid: 'border-destructive',
                disabled: 'opacity-50 cursor-not-allowed',
            },
        },
        defaultVariants: {
            size: 'md',
            state: 'default',
        },
    },
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

interface CheckboxProps extends StyledCheckboxProps, CheckboxVariants { }

const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

/**
 * Styled Checkbox component.
 * A toggle control with check/indeterminate visual indicators and Label integration.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" onCheckedChange={setAccepted} />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/checkbox | Documentation}
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            size,
            label,
            description,
            checked,
            defaultChecked,
            onCheckedChange,
            indeterminate,
            isDisabled,
            isRequired,
            isInvalid,
            id,
            ...props
        },
        ref,
    ) => {
        const {
            checkboxProps,
            labelProps,
            isChecked,
            isIndeterminate,
            state: checkState,
            fieldId,
        } = useCheckbox({
            checked,
            defaultChecked,
            onCheckedChange,
            indeterminate,
            isDisabled,
            isRequired,
            isInvalid,
            id,
        });

        const visualState = isDisabled
            ? 'disabled'
            : isInvalid
                ? 'invalid'
                : 'default';

        const descriptionId = description ? `${fieldId}-description` : undefined;
        const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5';

        return (
            <div className={cn('flex items-start gap-3', className)}>
                <div className="relative flex items-center">
                    <input
                        ref={ref}
                        className="sr-only peer"
                        {...props}
                        {...checkboxProps}
                        aria-describedby={descriptionId}
                    />
                    <div
                        className={cn(
                            checkboxVariants({ size, state: visualState }),
                            'flex items-center justify-center cursor-pointer',
                        )}
                        data-state={checkState}
                        aria-hidden="true"
                    >
                        {isChecked && !isIndeterminate && (
                            <CheckIcon className={iconSize} />
                        )}
                        {isIndeterminate && (
                            <MinusIcon className={iconSize} />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <Label
                        htmlFor={labelProps.htmlFor}
                        required={isRequired}
                        disabled={isDisabled}
                        className="cursor-pointer"
                    >
                        {label}
                    </Label>
                    {description && (
                        <p
                            id={descriptionId}
                            className="text-sm text-muted-foreground"
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        );
    },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
export type { CheckboxProps };
