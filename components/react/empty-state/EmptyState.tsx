import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useEmptyState } from '@ds0/primitives';
import type { StyledEmptyStateProps } from '@ds0/primitives';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      variant: {
        default: 'py-12 px-6',
        compact: 'py-6 px-4',
        card: 'py-12 px-6 rounded-lg border border-border bg-card',
      },
      size: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const iconSizeMap = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
} as const;

const titleSizeMap = {
  sm: 'text-sm font-medium',
  md: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
} as const;

const descSizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
} as const;

type EmptyStateVariants = VariantProps<typeof emptyStateVariants>;

/**
 * Props for the styled EmptyState component.
 */
interface EmptyStateComponentProps
  extends Omit<StyledEmptyStateProps, keyof EmptyStateVariants>,
    EmptyStateVariants {}

/**
 * Styled EmptyState component.
 * Displays a placeholder when a view has no content to show.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<InboxIcon />}
 *   title="No messages"
 *   description="You don't have any messages yet."
 * />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState
 *   variant="card"
 *   icon={<PlusCircleIcon />}
 *   title="No projects"
 *   action={<Button>Create Project</Button>}
 * />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/empty-state | Documentation}
 */
const EmptyState = forwardRef<HTMLDivElement, EmptyStateComponentProps>(
  (
    {
      className,
      variant,
      size = 'md',
      icon,
      title,
      description,
      action,
      children,
      isLive,
      ...props
    },
    ref,
  ) => {
    const { emptyStateProps } = useEmptyState({ isLive });
    const resolvedSize: 'sm' | 'md' | 'lg' = size ?? 'md';

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
        {...emptyStateProps}
      >
        {icon && (
          <div className={cn('text-muted-foreground', iconSizeMap[resolvedSize])} aria-hidden="true">
            {icon}
          </div>
        )}
        <div className={cn('text-foreground', titleSizeMap[resolvedSize])}>{title}</div>
        {description && (
          <p className={cn('text-muted-foreground max-w-sm', descSizeMap[resolvedSize])}>
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
        {children}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';

export { EmptyState, emptyStateVariants };
export type { EmptyStateComponentProps as EmptyStateProps };
