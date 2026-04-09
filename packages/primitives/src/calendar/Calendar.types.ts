import type React from 'react';

export interface UseCalendarProps { value?: Date; defaultValue?: Date; onChange?: (date: Date) => void; minDate?: Date; maxDate?: Date; disabledDates?: Date[]; }
export interface UseCalendarReturn { calendarProps: React.HTMLAttributes<HTMLDivElement>; currentMonth: Date; days: CalendarDay[]; goToNextMonth: () => void; goToPrevMonth: () => void; goToToday: () => void; selectDate: (date: Date) => void; selectedDate: Date | null; }
export interface CalendarDay { date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isDisabled: boolean; }
export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>, UseCalendarProps {}
export interface StyledCalendarProps extends CalendarProps { variant?: 'default' | 'bordered'; size?: 'sm' | 'md' | 'lg'; className?: string; }
