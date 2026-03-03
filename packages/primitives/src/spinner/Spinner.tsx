import { forwardRef } from 'react';
import type { SpinnerPrimitiveProps } from './Spinner.types';
import { useSpinner } from './useSpinner';

const SpinnerPrimitive = forwardRef<HTMLDivElement, SpinnerPrimitiveProps>(
    ({ label, children, ...rest }, ref) => {
        const { spinnerProps } = useSpinner({ label });
        return (
            <div ref={ref} {...rest} {...spinnerProps}>
                {children || (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                )}
            </div>
        );
    },
);
SpinnerPrimitive.displayName = 'SpinnerPrimitive';
export { SpinnerPrimitive };
