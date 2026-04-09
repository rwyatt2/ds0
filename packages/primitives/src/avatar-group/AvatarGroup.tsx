import { forwardRef } from 'react';
import type { AvatarGroupProps } from './AvatarGroup.types';
import { useAvatarGroup } from './useAvatarGroup';
const AvatarGroupPrimitive = forwardRef<HTMLDivElement, AvatarGroupProps>(({ avatars, max, ...rest }, ref) => {
    const { avatarGroupProps, visibleAvatars, overflowCount } = useAvatarGroup({ avatars, max });
    return (<div ref={ref} {...rest} {...avatarGroupProps} style={{ display: 'flex' }}>{visibleAvatars.map(a => <div key={a.id} style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginLeft: -8, border: '2px solid white' }}>{a.fallback || a.alt?.[0] || '?'}</div>)}{overflowCount > 0 && <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, marginLeft: -8, border: '2px solid white' }}>+{overflowCount}</div>}</div>);
});
AvatarGroupPrimitive.displayName = 'AvatarGroupPrimitive';
export { AvatarGroupPrimitive };
