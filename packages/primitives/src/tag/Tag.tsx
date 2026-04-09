import React, { forwardRef } from 'react';
import { useTag } from './useTag';
import type { TagProps } from './Tag.types';

/**
 * Headless Tag primitive.
 * Provides behavior for dismissible tags without styling.
 */
const TagPrimitive = forwardRef<HTMLSpanElement, TagProps>(
    ({ isRemovable, isDisabled, onRemove, children, ...props }, ref) => {
        const { removeButtonProps } = useTag({ isRemovable, isDisabled, onRemove });

        return (
            <span ref={ref} {...props}>
                {children}
                {isRemovable && (
                    <button {...removeButtonProps}>
                        ×
                    </button>
                )}
            </span>
        );
    },
);

TagPrimitive.displayName = 'TagPrimitive';

export { TagPrimitive };
