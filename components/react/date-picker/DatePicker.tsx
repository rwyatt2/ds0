import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useDatePicker } from '@ds0/primitives';
import type { StyledDatePickerProps } from '@ds0/primitives';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const inputSizes = { sm: 'h-8 text-xs', md: 'h-10 text-sm', lg: 'h-12 text-base' };

const DatePicker = forwardRef<HTMLDivElement, StyledDatePickerProps>(
    ({ className, size = 'md', value, defaultValue, onChange, min, max, placeholder = 'Select date', isDisabled, ...props }, ref) => {
        const { inputProps, triggerProps, isOpen, toggle, selectDate, currentMonth, goToNextMonth, goToPreviousMonth, getDaysInMonth } = useDatePicker({ value, defaultValue, onChange, min, max, isDisabled });
        const days = isOpen ? getDaysInMonth() : [];
        return (
            <div ref={ref} className={cn('relative inline-block', className)} {...props}>
                <div className="flex items-center border border-border rounded-md overflow-hidden bg-background">
                    <input {...inputProps} placeholder={placeholder} className={cn('flex-1 px-3 outline-none bg-transparent', inputSizes[size])} />
                    <button type="button" {...triggerProps} className="px-2 text-muted-foreground hover:text-foreground">📅</button>
                </div>
                {isOpen && (
                    <div className="absolute z-50 mt-1 p-3 rounded-lg border border-border bg-popover shadow-lg w-72">
                        <div className="flex items-center justify-between mb-2">
                            <button type="button" onClick={goToPreviousMonth} className="p-1 hover:bg-muted rounded" aria-label="Previous month">←</button>
                            <span className="text-sm font-medium">{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                            <button type="button" onClick={goToNextMonth} className="p-1 hover:bg-muted rounded" aria-label="Next month">→</button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {DAYS.map((d) => (<div key={d} className="text-xs font-medium text-muted-foreground py-1">{d}</div>))}
                            {days.map((day, i) => (
                                <button key={i} type="button" disabled={day.isDisabled} onClick={() => selectDate(day.date)}
                                    className={cn('h-8 w-8 rounded-md text-sm transition-colors',
                                        !day.isCurrentMonth && 'text-muted-foreground/40',
                                        day.isCurrentMonth && !day.isSelected && 'hover:bg-muted',
                                        day.isToday && !day.isSelected && 'border border-primary text-primary',
                                        day.isSelected && 'bg-primary text-primary-foreground',
                                        day.isDisabled && 'opacity-30 cursor-not-allowed',
                                    )}
                                    aria-label={day.date.toLocaleDateString()} aria-current={day.isToday ? 'date' : undefined} aria-selected={day.isSelected}>
                                    {day.date.getDate()}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-border">
                            <button type="button" onClick={() => selectDate(new Date())} className="text-xs text-primary hover:underline">Today</button>
                            <button type="button" onClick={() => { selectDate(null); toggle(); }} className="text-xs text-muted-foreground hover:underline">Clear</button>
                        </div>
                    </div>
                )}
            </div>
        );
    },
);
DatePicker.displayName = 'DatePicker';
export { DatePicker };
export type { StyledDatePickerProps as DatePickerProps };
