import type { UseLinkProps, UseLinkReturn } from './Link.types';

export function useLink(props: UseLinkProps = {}): UseLinkReturn {
    const { isExternal = false, isDisabled = false, href } = props;

    return {
        linkProps: {
            href: isDisabled ? undefined : href,
            target: isExternal ? '_blank' : undefined,
            rel: isExternal ? 'noopener noreferrer' : undefined,
            'aria-disabled': isDisabled || undefined,
            tabIndex: isDisabled ? -1 : undefined,
            onClick: isDisabled ? ((e: React.MouseEvent) => e.preventDefault()) as React.MouseEventHandler<HTMLAnchorElement> : undefined,
        },
    };
}
