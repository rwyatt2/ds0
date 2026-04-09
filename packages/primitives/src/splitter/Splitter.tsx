import { forwardRef } from 'react';

import type { SplitterGroupProps, SplitterPanelProps, SplitterHandleProps } from './Splitter.types';
import { useSplitter } from './useSplitter';

/**
 * Headless SplitterGroup primitive.
 */
const SplitterGroupPrimitive = forwardRef<HTMLDivElement, SplitterGroupProps>(
  ({ children, direction, isDisabled, ...rest }, ref) => {
    const { groupProps } = useSplitter({ direction, isDisabled });
    return (
      <div ref={ref} {...rest} {...groupProps}>
        {children}
      </div>
    );
  },
);
SplitterGroupPrimitive.displayName = 'SplitterGroupPrimitive';

/**
 * Headless SplitterPanel primitive.
 */
const SplitterPanelPrimitive = forwardRef<HTMLDivElement, SplitterPanelProps>(
  ({ children, defaultSize, minSize: _min, maxSize: _max, style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        style={{ flex: defaultSize ? `${defaultSize} 1 0%` : '1 1 0%', minWidth: 0, minHeight: 0, overflow: 'auto', ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SplitterPanelPrimitive.displayName = 'SplitterPanelPrimitive';

/**
 * Headless SplitterHandle primitive.
 */
const SplitterHandlePrimitive = forwardRef<HTMLDivElement, SplitterHandleProps>(
  ({ isDisabled, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled || undefined}
        {...rest}
      />
    );
  },
);
SplitterHandlePrimitive.displayName = 'SplitterHandlePrimitive';

export { SplitterGroupPrimitive, SplitterPanelPrimitive, SplitterHandlePrimitive };
