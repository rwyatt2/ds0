import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useAvatarGroup } from '@ds0/primitives';
import type { StyledAvatarGroupProps } from '@ds0/primitives';
const sizes = { sm: 'w-7 h-7 text-[10px] -ml-2', md: 'w-9 h-9 text-xs -ml-2.5', lg: 'w-11 h-11 text-sm -ml-3' };
const AvatarGroup = forwardRef<HTMLDivElement, StyledAvatarGroupProps>(({ className, size = 'md', avatars, max, ...props }, ref) => {
    const { avatarGroupProps, visibleAvatars, overflowCount } = useAvatarGroup({ avatars, max });
    return (
        <div ref={ref} className={cn('flex items-center', className)} {...props} {...avatarGroupProps}>
            {visibleAvatars.map(a => (
                <div key={a.id} className={cn('rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium text-muted-foreground shrink-0', sizes[size])}>
                    {a.src ? <img src={a.src} alt={a.alt || ''} className="w-full h-full rounded-full object-cover" /> : (a.fallback || a.alt?.[0] || '?')}
                </div>
            ))}
            {overflowCount > 0 && <div className={cn('rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium text-muted-foreground shrink-0', sizes[size])}>+{overflowCount}</div>}
        </div>
    );
});
AvatarGroup.displayName = 'AvatarGroup';
export { AvatarGroup };
export type { StyledAvatarGroupProps as AvatarGroupProps };
