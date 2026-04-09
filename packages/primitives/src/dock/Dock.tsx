import { forwardRef } from 'react';
import type { DockProps } from './Dock.types';
import { useDock } from './useDock';

const DockPrimitive = forwardRef<HTMLDivElement, DockProps>(
  ({ children, defaultPosition, position, onPositionChange, isDraggable, ...rest }, ref) => {
    const { dockProps, handleProps } = useDock({ defaultPosition, position, onPositionChange, isDraggable });
    return (
      <div ref={ref} {...rest} {...dockProps}>
        <div {...handleProps}>{children}</div>
      </div>
    );
  },
);
DockPrimitive.displayName = 'DockPrimitive';
export { DockPrimitive };
