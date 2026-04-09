import React, { forwardRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import type { StyledDiffViewerProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledScrollView = styled(ScrollView);
const DiffViewer = forwardRef<React.ElementRef<typeof View>, StyledDiffViewerProps>(({ oldValue, newValue, ...props }, ref) => {
    const oldLines = oldValue.split('\n'); const newLines = newValue.split('\n');
    return (<StyledScrollView ref={ref} className="border rounded-lg p-3" {...props}>{oldLines.map((l,i) => <StyledText key={`o${i}`} className={`font-mono text-sm ${newLines[i]!==l?'text-red-600 bg-red-50':''}`}>- {l}</StyledText>)}{newLines.map((l,i) => <StyledText key={`n${i}`} className={`font-mono text-sm ${oldLines[i]!==l?'text-emerald-600 bg-emerald-50':''}`}>+ {l}</StyledText>)}</StyledScrollView>);
});
DiffViewer.displayName = 'DiffViewer';
export { DiffViewer };
