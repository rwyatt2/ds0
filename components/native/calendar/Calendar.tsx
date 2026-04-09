import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { useCalendar } from '@ds0/primitives';
import type { StyledCalendarProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledPressable = styled(Pressable);
const Calendar = forwardRef<React.ElementRef<typeof View>, StyledCalendarProps>(({ value, defaultValue, onChange, minDate, maxDate, disabledDates, ...props }, ref) => {
    const { currentMonth, days, goToNextMonth, goToPrevMonth, selectDate } = useCalendar({ value, defaultValue, onChange, minDate, maxDate, disabledDates });
    return (
        <StyledView ref={ref} className="rounded-lg border p-4 bg-white" {...props}>
            <StyledView className="flex-row justify-between items-center mb-3">
                <StyledPressable onPress={goToPrevMonth}><StyledText className="text-lg">‹</StyledText></StyledPressable>
                <StyledText className="font-semibold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</StyledText>
                <StyledPressable onPress={goToNextMonth}><StyledText className="text-lg">›</StyledText></StyledPressable>
            </StyledView>
            <StyledView className="flex-row flex-wrap">
                {days.map((d, i) => <StyledPressable key={i} onPress={() => !d.isDisabled && selectDate(d.date)} className={`w-[14.28%] items-center py-2 rounded ${d.isSelected ? 'bg-blue-600' : d.isToday ? 'bg-blue-100' : ''}`}><StyledText className={`text-sm ${d.isCurrentMonth ? '' : 'text-gray-300'} ${d.isSelected ? 'text-white font-bold' : ''}`}>{d.date.getDate()}</StyledText></StyledPressable>)}
            </StyledView>
        </StyledView>
    );
});
Calendar.displayName = 'Calendar';
export { Calendar };
