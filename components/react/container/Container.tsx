import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import type { StyledContainerProps } from '@ds0/primitives';

const containerVariants = cva('w-full', {
    variants: {
        size: { sm: 'max-w-screen-sm', md: 'max-w-screen-md', lg: 'max-w-screen-lg', xl: 'max-w-screen-xl', full: 'max-w-full' },
        center: { true: 'mx-auto' },
        padding: { true: 'px-4 sm:px-6 lg:px-8' },
    },
    defaultVariants: { size: 'lg', center: true, padding: true },
});

type ContainerVariants = VariantProps<typeof containerVariants>;
interface ContainerProps extends StyledContainerProps, ContainerVariants {}

const Container = forwardRef<HTMLElement, ContainerProps>(
    ({ className, as: Element = 'div', size, center, padding, children, ...props }, ref) => (
        <Element ref={ref} className={cn(containerVariants({ size, center, padding }), className)} {...props}>{children}</Element>
    ),
);
Container.displayName = 'Container';
export { Container, containerVariants };
export type { ContainerProps };
