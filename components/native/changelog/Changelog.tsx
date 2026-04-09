import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import type { StyledChangelogProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);
const Changelog = forwardRef<React.ElementRef<typeof View>, StyledChangelogProps>(({ entries, title, ...props }, ref) => (
    <StyledView ref={ref} {...props}>{title && <StyledText className="text-xl font-bold mb-4">{title}</StyledText>}{entries.map(e => <StyledView key={e.id} className="mb-4 pl-4 border-l-2 border-gray-200"><StyledText className="text-sm font-semibold">{e.version} — {e.title}</StyledText><StyledText className="text-xs text-gray-500">{e.date}</StyledText>{e.description && <StyledText className="text-sm text-gray-600 mt-1">{e.description}</StyledText>}</StyledView>)}</StyledView>
));
Changelog.displayName = 'Changelog';
export { Changelog };
