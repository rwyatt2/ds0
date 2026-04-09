import { forwardRef } from 'react';
import type { CalendarProps } from './Calendar.types';
import { useCalendar } from './useCalendar';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarPrimitive = forwardRef<HTMLDivElement, CalendarProps>(
    ({ value, defaultValue, onChange, minDate, maxDate, disabledDates, ...rest }, ref) => {
        const { calendarProps, currentMonth, days, goToNextMonth, goToPrevMonth, selectDate } = useCalendar({ value, defaultValue, onChange, minDate, maxDate, disabledDates });
        return (
            <div ref={ref} {...rest} {...calendarProps}>
                <div>
                    <button onClick={goToPrevMonth} aria-label="Previous month">‹</button>
                    <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={goToNextMonth} aria-label="Next month">›</button>
                </div>
                <div>{WEEKDAYS.map(d => <span key={d}>{d}</span>)}</div>
                <div>{days.map((day, i) => (
                    <button key={i} onClick={() => !day.isDisabled && selectDate(day.date)} disabled={day.isDisabled} aria-selected={day.isSelected} aria-current={day.isToday ? 'date' : undefined}>
                        {day.date.getDate()}
                    </button>
                ))}</div>
            </div>
        );
    },
);
CalendarPrimitive.displayName = 'CalendarPrimitive';
export { CalendarPrimitive };
