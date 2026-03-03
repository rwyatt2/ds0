import { forwardRef } from 'react';

import type { CheckboxPrimitiveProps } from './Checkbox.types';
import { useCheckbox } from './useCheckbox';

/**
 * Headless Checkbox primitive.
 * Provides a labeled checkbox with indeterminate support and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <CheckboxPrimitive label="Accept terms" onCheckedChange={setAccepted} />
 * ```
 */
const CheckboxPrimitive = forwardRef<HTMLInputElement, CheckboxPrimitiveProps>(
    (
        {
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
            ...rest
        },
        ref,
    ) => {
        const { checkboxProps, labelProps, fieldId } = useCheckbox({
            checked,
            defaultChecked,
            onCheckedChange,
            indeterminate,
            isDisabled,
            isRequired,
            isInvalid,
            id,
        });

        const descriptionId = description ? `${fieldId}-description` : undefined;

        return (
            <div>
                <div>
                    <input
                        ref={ref}
                        {...rest}
                        {...checkboxProps}
                        aria-describedby={descriptionId}
                    />
                    <label {...labelProps}>{label}</label>
                </div>
                {description && (
                    <p id={descriptionId}>{description}</p>
                )}
            </div>
        );
    },
);

CheckboxPrimitive.displayName = 'CheckboxPrimitive';

export { CheckboxPrimitive };
