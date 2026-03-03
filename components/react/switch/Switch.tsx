import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useSwitch } from '@ds0/primitives';
import type { StyledSwitchProps } from '@ds0/primitives';
import { Label } from '../label';

const switchVariants = cva(
    'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    {
        variants: {
            size: {
                sm: 'h-5 w-9',
                md: 'h-6 w-11',
                lg: 'h-7 w-[52px]',
            },
        },
        defaultVariants: { size: 'md' },
    },
);

const switchThumbVariants = cva(
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
    {
        variants: {
            size: {
                sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
                md: 'h-5 w-5 data-[state=checked]:translate-x-5',
                lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
            },
        },
        defaultVariants: { size: 'md' },
    },
);

type SwitchVariantProps = VariantProps<typeof switchVariants>;

interface SwitchProps extends Omit<StyledSwitchProps, 'size'>, SwitchVariantProps { }

/**
 * Styled Switch component.
 * A toggle control for settings that take immediate effect.
 */
const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, size, label, description, checked, defaultChecked, onCheckedChange, isDisabled, id, ...props }, ref) => {
        const { switchProps, isChecked, state, fieldId } = useSwitch({ checked, defaultChecked, onCheckedChange, isDisabled, id });
        const labelId = `${fieldId}-label`;
        const descriptionId = description ? `${fieldId}-desc` : undefined;

        return (
            <div className={cn('flex items-center justify-between gap-4', className)}>
                <div className="flex flex-col gap-0.5">
                    <Label id={labelId} htmlFor={fieldId} disabled={isDisabled}>{label}</Label>
                    {description && <p id={descriptionId} className="text-sm text-muted-foreground">{description}</p>}
                </div>
                <button ref={ref} className={cn(switchVariants({ size }), isDisabled && 'opacity-50 cursor-not-allowed')} data-state={state} {...props} {...switchProps} aria-labelledby={labelId} aria-describedby={descriptionId}>
                    <span className={cn(switchThumbVariants({ size }))} data-state={state} />
                </button>
            </div>
        );
    },
);

Switch.displayName = 'Switch';

export { Switch, switchVariants, switchThumbVariants };
export type { SwitchProps };
