import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useCalendar } from '@ds0/primitives';
import type { StyledCalendarProps } from '@ds0/primitives';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = forwardRef<HTMLDivElement, StyledCalendarProps>(
    ({ className, variant = 'default', size = 'md', value, defaultValue, onChange, minDate, maxDate, disabledDates, ...props }, ref) => {
        const { calendarProps, currentMonth, days, goToNextMonth, goToPrevMonth, selectDate } = useCalendar({ value, defaultValue, onChange, minDate, maxDate, disabledDates });
        const cellSize = size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm';
        return (
            <div ref={ref} className={cn('rounded-lg p-4', variant === 'bordered' ? 'border' : 'bg-card shadow-sm border', className)} {...props}>
                <div className="flex items-center justify-between mb-4">
                    <button onClick={goToPrevMonth} aria-label="Previous month" className="rounded-md p-1.5 hover:bg-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
                    <h2 className="text-sm font-semibold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={goToNextMonth} aria-label="Next month" className="rounded-md p-1.5 hover:bg-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
                </div>
                <div className="grid grid-cols-7 mb-1" {...calendarProps}>
                    {WEEKDAYS.map(d => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>)}
                    {days.map((day, i) => (
                        <button key={i} onClick={() => !day.isDisabled && selectDate(day.date)} disabled={day.isDisabled} aria-selected={day.isSelected} aria-current={day.isToday ? 'date' : undefined}
                            className={cn('rounded-md flex items-center justify-center transition-colors', cellSize,
                                !day.isCurrentMonth && 'text-muted-foreground/40',
                                day.isCurrentMonth && !day.isSelected && !day.isToday && 'text-foreground hover:bg-accent',
                                day.isToday && !day.isSelected && 'bg-accent font-semibold',
                                day.isSelected && 'bg-primary text-primary-foreground font-semibold',
                                day.isDisabled && 'opacity-50 cursor-not-allowed',
                            )}
                        >{day.date.getDate()}</button>
                    ))}
                </div>
            </div>
        );
    },
);
Calendar.displayName = 'Calendar';
export { Calendar };
export type { StyledCalendarProps as CalendarProps };
