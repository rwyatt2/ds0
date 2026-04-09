import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useLink } from '@ds0/primitives';
import type { StyledLinkProps } from '@ds0/primitives';

const linkVariants = cva(
    'inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded',
    {
        variants: {
            variant: {
                default: 'text-primary underline-offset-4 hover:underline',
                muted: 'text-muted-foreground underline-offset-4 hover:text-foreground hover:underline',
                underline: 'text-primary underline underline-offset-4 hover:text-primary/80',
            },
            size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
        },
        defaultVariants: { variant: 'default', size: 'md' },
    },
);

type LinkVariantProps = VariantProps<typeof linkVariants>;
interface LinkProps extends Omit<StyledLinkProps, keyof LinkVariantProps>, LinkVariantProps { }

const ExternalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, variant, size, href, isExternal, isDisabled, children, ...props }, ref) => {
        const { linkProps } = useLink({ isExternal, isDisabled, href });
        return (
            <a ref={ref} className={cn(linkVariants({ variant, size }), isDisabled && 'opacity-50 pointer-events-none', className)} {...props} {...linkProps}>
                {children}
                {isExternal && <ExternalIcon />}
                {isExternal && <span className="sr-only"> (opens in new tab)</span>}
            </a>
        );
    },
);

Link.displayName = 'Link';
export { Link, linkVariants };
export type { LinkProps };
