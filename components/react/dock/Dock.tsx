import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useDock } from '@ds0/primitives';
import type { StyledDockProps } from '@ds0/primitives';

const dockVariants = cva('rounded-lg shadow-xl overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-background border border-border',
      floating: 'bg-background/95 border border-border shadow-2xl',
      glass: 'bg-background/60 backdrop-blur-lg border border-white/20',
    },
    size: { sm: 'w-64', md: 'w-80', lg: 'w-96' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

type DockVariants = VariantProps<typeof dockVariants>;
interface DockComponentProps extends Omit<StyledDockProps, keyof DockVariants>, DockVariants {}

const Dock = forwardRef<HTMLDivElement, DockComponentProps>(
  ({ className, variant, size, defaultPosition, position, onPositionChange, isDraggable, children, ...props }, ref) => {
    const { dockProps, handleProps } = useDock({ defaultPosition, position, onPositionChange, isDraggable });
    return (
      <div ref={ref} className={cn(dockVariants({ variant, size }), className)} {...props} {...dockProps}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50 select-none" {...handleProps}>
          <span className="text-xs font-medium text-muted-foreground">Panel</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
        <div className="p-3">{children}</div>
      </div>
    );
  },
);
Dock.displayName = 'Dock';
export { Dock, dockVariants };
export type { DockComponentProps as DockProps };
