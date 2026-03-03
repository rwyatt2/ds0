import React, { forwardRef, useMemo } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useRadioGroup, RadioGroupContext } from '@ds0/primitives';
import type { StyledRadioGroupProps } from '@ds0/primitives';

const radioGroupVariants = cva('flex gap-2', {
    variants: {
        orientation: {
            vertical: 'flex-col',
            horizontal: 'flex-row flex-wrap',
        },
    },
    defaultVariants: {
        orientation: 'vertical',
    },
});

type RadioGroupProps = StyledRadioGroupProps;

/**
 * Styled RadioGroup component.
 * A set of mutually exclusive options where the user selects exactly one.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Plan" defaultValue="free">
 *   <RadioGroup.Item value="free" label="Free" />
 *   <RadioGroup.Item value="pro" label="Pro" description="$9/mo" />
 * </RadioGroup>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/radio-group | Documentation}
 */
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            className,
            orientation = 'vertical',
            value,
            defaultValue,
            onValueChange,
            isDisabled = false,
            isRequired = false,
            isInvalid = false,
            label,
            errorMessage,
            children,
            size: _size,
            ...props
        },
        ref,
    ) => {
        const stringValue = typeof value === 'string' ? value : undefined;
        const stringDefault = typeof defaultValue === 'string' ? defaultValue : undefined;

        const { groupProps, selectedValue } = useRadioGroup({
            value: stringValue,
            defaultValue: stringDefault,
            onValueChange,
            orientation,
            isDisabled,
            isRequired,
        });

        const contextValue = useMemo(
            () => ({
                selectedValue,
                onSelect: (v: string) => {
                    // In uncontrolled mode, useControllable handles state update
                    // but we also need to fire the callback through the hook
                    onValueChange?.(v);
                },
                isDisabled,
                isRequired,
                name: groupProps.id ?? '',
                orientation,
            }),
            [selectedValue, onValueChange, isDisabled, isRequired, groupProps.id, orientation],
        );

        return (
            <RadioGroupContext.Provider value={contextValue}>
                <div ref={ref} {...groupProps} {...props}>
                    <span
                        id={`${groupProps.id}-label`}
                        className="text-sm font-medium leading-none"
                    >
                        {label}
                        {isRequired && (
                            <span className="text-destructive ml-1" aria-hidden="true">
                                *
                            </span>
                        )}
                    </span>
                    <div
                        className={cn(radioGroupVariants({ orientation }), className)}
                        aria-labelledby={`${groupProps.id}-label`}
                    >
                        {children}
                    </div>
                    {isInvalid && errorMessage && (
                        <span className="text-sm text-destructive mt-1">{errorMessage}</span>
                    )}
                </div>
            </RadioGroupContext.Provider>
        );
    },
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup, radioGroupVariants };
export type { RadioGroupProps };
