import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { useCountdownTimer } from '@ds0/primitives';
import type { StyledCountdownTimerProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);

const CountdownTimer = forwardRef<React.ElementRef<typeof View>, StyledCountdownTimerProps>(
    ({ targetDate, onComplete, autoStart, size = 'md', ...props }, ref) => {
        const { days, hours, minutes, seconds } = useCountdownTimer({ targetDate, onComplete, autoStart });
        const fs = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };
        return (
            <StyledView ref={ref} className="flex-row items-center gap-2" accessibilityRole="timer" accessibilityLabel={`${days}d ${hours}h ${minutes}m ${seconds}s remaining`} {...props}>
                {[{ v: days, l: 'D' }, { v: hours, l: 'H' }, { v: minutes, l: 'M' }, { v: seconds, l: 'S' }].map(({ v, l }) => (
                    <StyledView key={l} className="items-center">
                        <StyledText className={`${fs[size]} font-bold font-mono`}>{String(v).padStart(2, '0')}</StyledText>
                        <StyledText className="text-xs text-gray-500">{l}</StyledText>
                    </StyledView>
                ))}
            </StyledView>
        );
    },
);
CountdownTimer.displayName = 'CountdownTimer';
export { CountdownTimer };
