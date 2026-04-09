import { useCallback, useMemo, useState } from 'react';
import type { UseDatePickerProps, UseDatePickerReturn } from './DatePicker.types';

export function useDatePicker(props: UseDatePickerProps = {}): UseDatePickerReturn {
    const { value, defaultValue, onChange, min, max, isDisabled = false } = props;
    const [internalDate, setInternalDate] = useState<Date | null>(defaultValue ?? null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value ?? defaultValue ?? new Date());
    const selectedDate = value !== undefined ? value : internalDate;

    const selectDate = useCallback((date: Date | null) => {
        if (isDisabled) return;
        if (date && min && date < min) return;
        if (date && max && date > max) return;
        if (onChange) onChange(date); else setInternalDate(date);
        setIsOpen(false);
    }, [isDisabled, min, max, onChange]);

    const toggle = useCallback(() => { if (!isDisabled) setIsOpen((o) => !o); }, [isDisabled]);
    const goToNextMonth = useCallback(() => { setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)); }, []);
    const goToPreviousMonth = useCallback(() => { setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)); }, []);

    const getDaysInMonth = useCallback(() => {
        const year = currentMonth.getFullYear(); const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const days: UseDatePickerReturn['getDaysInMonth'] extends () => (infer R)[] ? R[] : never = [];
        // Previous month padding
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) { const d = new Date(year, month - 1, prevMonthDays - i); days.push({ date: d, isCurrentMonth: false, isToday: false, isSelected: false, isDisabled: true }); }
        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            const d = new Date(year, month, i); d.setHours(0, 0, 0, 0);
            const disabled = (min ? d < min : false) || (max ? d > max : false);
            days.push({ date: d, isCurrentMonth: true, isToday: d.getTime() === today.getTime(), isSelected: selectedDate ? d.getTime() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime() : false, isDisabled: disabled });
        }
        return days;
    }, [currentMonth, selectedDate, min, max]);

    const formatDate = (d: Date | null) => d ? `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}` : '';

    return {
        inputProps: { value: formatDate(selectedDate), readOnly: true, 'aria-label': 'Date', 'aria-disabled': isDisabled || undefined },
        triggerProps: { 'aria-expanded': isOpen, 'aria-label': 'Open calendar', 'aria-disabled': isDisabled || undefined, onClick: toggle },
        isOpen, toggle, selectedDate, selectDate, currentMonth, goToNextMonth, goToPreviousMonth, getDaysInMonth,
    };
}
