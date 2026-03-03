import { forwardRef } from 'react';

import type { SwitchPrimitiveProps } from './Switch.types';
import { useSwitch } from './useSwitch';

/**
 * Headless Switch primitive.
 * Renders a `<button>` with `role="switch"` — NOT a checkbox.
 */
const SwitchPrimitive = forwardRef<HTMLButtonElement, SwitchPrimitiveProps>(
    ({ label, description, checked, defaultChecked, onCheckedChange, isDisabled, id, ...rest }, ref) => {
        const { switchProps, thumbProps, fieldId } = useSwitch({ checked, defaultChecked, onCheckedChange, isDisabled, id });
        const labelId = `${fieldId}-label`;
        const descriptionId = description ? `${fieldId}-desc` : undefined;

        return (
            <div>
                <button ref={ref} {...rest} {...switchProps} aria-labelledby={labelId} aria-describedby={descriptionId}>
                    <span {...thumbProps} />
                </button>
                <div>
                    <label id={labelId}>{label}</label>
                    {description && <p id={descriptionId}>{description}</p>}
                </div>
            </div>
        );
    },
);

SwitchPrimitive.displayName = 'SwitchPrimitive';

export { SwitchPrimitive };
