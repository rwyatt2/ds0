import type { UseAvatarGroupProps, UseAvatarGroupReturn } from './AvatarGroup.types';
export function useAvatarGroup(props: UseAvatarGroupProps): UseAvatarGroupReturn {
    const { avatars, max } = props;
    const visibleAvatars = max ? avatars.slice(0, max) : avatars;
    const overflowCount = max ? Math.max(0, avatars.length - max) : 0;
    return { avatarGroupProps: { role: 'group', 'aria-label': `${avatars.length} users` }, visibleAvatars, overflowCount };
}
