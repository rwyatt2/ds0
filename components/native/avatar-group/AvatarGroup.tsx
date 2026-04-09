import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import type { StyledAvatarGroupProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);
const AvatarGroup = forwardRef<React.ElementRef<typeof View>, StyledAvatarGroupProps>(({ avatars, max, ...props }, ref) => {
    const visible = max ? avatars.slice(0, max) : avatars;
    const overflow = max ? Math.max(0, avatars.length - max) : 0;
    return (<StyledView ref={ref} className="flex-row items-center" {...props}>{visible.map(a => <StyledView key={a.id} className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center -ml-2 border-2 border-white"><StyledText className="text-xs">{a.fallback || '?'}</StyledText></StyledView>)}{overflow > 0 && <StyledView className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center -ml-2 border-2 border-white"><StyledText className="text-xs">+{overflow}</StyledText></StyledView>}</StyledView>);
});
AvatarGroup.displayName = 'AvatarGroup';
export { AvatarGroup };
