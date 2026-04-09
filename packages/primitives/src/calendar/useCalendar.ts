import { useCallback, useState } from 'react';
import type { UseCalendarProps, UseCalendarReturn, CalendarDay } from './Calendar.types';

function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function getDaysInMonth(year: number, month: number): CalendarDay[] {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days: CalendarDay[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, daysInPrevMonth - i);
        days.push({ date, isCurrentMonth: false, isToday: isSameDay(date, today), isSelected: false, isDisabled: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        days.push({ date, isCurrentMonth: true, isToday: isSameDay(date, today), isSelected: false, isDisabled: false });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        const date = new Date(year, month + 1, i);
        days.push({ date, isCurrentMonth: false, isToday: isSameDay(date, today), isSelected: false, isDisabled: false });
    }
    return days;
}

export function useCalendar(props: UseCalendarProps = {}): UseCalendarReturn {
    const { value, defaultValue, onChange, minDate, maxDate, disabledDates = [] } = props;
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || defaultValue || null);
    const [currentMonth, setCurrentMonth] = useState(value || defaultValue || new Date());

    const goToNextMonth = useCallback(() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)), []);
    const goToPrevMonth = useCallback(() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)), []);
    const goToToday = useCallback(() => { const t = new Date(); setCurrentMonth(t); setSelectedDate(t); onChange?.(t); }, [onChange]);

    const selectDate = useCallback((date: Date) => {
        setSelectedDate(date);
        onChange?.(date);
    }, [onChange]);

    const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()).map(day => ({
        ...day,
        isSelected: selectedDate ? isSameDay(day.date, selectedDate) : false,
        isDisabled: (minDate && day.date < minDate) || (maxDate && day.date > maxDate) || disabledDates.some(d => isSameDay(d, day.date)) || false,
    }));

    return {
        calendarProps: { role: 'grid', 'aria-label': `Calendar: ${currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}` },
        currentMonth, days, goToNextMonth, goToPrevMonth, goToToday, selectDate, selectedDate,
    };
}
