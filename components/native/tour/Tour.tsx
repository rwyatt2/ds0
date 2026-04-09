import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import type { StyledTourProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledPressable = styled(Pressable);
const Tour = forwardRef<React.ElementRef<typeof View>, StyledTourProps>(({ steps, active, onComplete, onSkip, ...props }, ref) => {
    const [step, setStep] = React.useState(0);
    if (!active) return null;
    const s = steps[step];
    const isLast = step >= steps.length - 1;
    return (<StyledView ref={ref} className="absolute inset-0 bg-black/40 items-center justify-center" {...props}><StyledView className="w-80 bg-white rounded-xl p-6 shadow-lg"><StyledText className="text-xs text-gray-500 mb-2">{step + 1} of {steps.length}</StyledText><StyledText className="font-semibold text-lg mb-2">{s.title}</StyledText><StyledText className="text-sm text-gray-600 mb-4">{s.content}</StyledText><StyledView className="flex-row justify-between">{step > 0 ? <StyledPressable onPress={() => setStep(step - 1)}><StyledText className="text-sm">Back</StyledText></StyledPressable> : <StyledView />}<StyledPressable onPress={() => isLast ? onComplete?.() : setStep(step + 1)} className="bg-blue-600 rounded-md px-4 py-1.5"><StyledText className="text-white text-sm font-medium">{isLast ? 'Done' : 'Next'}</StyledText></StyledPressable></StyledView></StyledView></StyledView>);
});
Tour.displayName = 'Tour';
export { Tour };
