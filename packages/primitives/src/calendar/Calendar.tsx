import { forwardRef } from 'react';
import type { CalendarProps } from './Calendar.types';
import { useCalendar } from './useCalendar';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarPrimitive = forwardRef<HTMLDivElement, CalendarProps>(
    ({ value, defaultValue, onChange, minDate, maxDate, disabledDates, ...rest }, ref) => {
        const { calendarProps, currentMonth, days, goToNextMonth, goToPrevMonth, selectDate } = useCalendar({ value, defaultValue, onChange, minDate, maxDate, disabledDates });
        // Group days into weeks (7 days per row)
        const weeks: typeof days[] = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }
        return (
            <div ref={ref} {...rest}>
                <div>
                    <button onClick={goToPrevMonth} aria-label="Previous month">‹</button>
                    <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={goToNextMonth} aria-label="Next month">›</button>
                </div>
                <div {...calendarProps}>
                    <div role="row">{WEEKDAYS.map(d => <span key={d} role="columnheader">{d}</span>)}</div>
                    {weeks.map((week, wi) => (
                        <div key={wi} role="row">{week.map((day, di) => (
                            <span key={di} role="gridcell" aria-selected={day.isSelected}>
                                <button onClick={() => !day.isDisabled && selectDate(day.date)} disabled={day.isDisabled} aria-current={day.isToday ? 'date' : undefined} tabIndex={day.isSelected ? 0 : -1}>
                                    {day.date.getDate()}
                                </button>
                            </span>
                        ))}</div>
                    ))}
                </div>
            </div>
        );
    },
);
CalendarPrimitive.displayName = 'CalendarPrimitive';
export { CalendarPrimitive };
