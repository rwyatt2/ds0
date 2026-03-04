import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { RowAction } from './types';
import { cn } from './utils';
import { ColumnsIcon, CheckIcon, XIcon, MoreVerticalIcon } from './icons';

// ─── Column Visibility Dropdown ──────────────────────────────

export const ColumnVisibilityDropdown = React.memo(function ColumnVisibilityDropdown({
    columns,
    hiddenColumns,
    onToggle,
}: {
    columns: { key: string; header: string }[];
    hiddenColumns: Set<string>;
    onToggle: (key: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent): void {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className="dg-col-toggle-wrap">
            <button
                type="button"
                className="dg-toolbar-btn"
                onClick={() => setOpen(!open)}
                aria-label="Toggle column visibility"
                aria-expanded={open}
            >
                <ColumnsIcon /> Columns
            </button>
            {open && (
                <div className="dg-col-dropdown" role="menu">
                    {columns.map((col) => (
                        <button
                            key={col.key}
                            type="button"
                            role="menuitemcheckbox"
                            aria-checked={!hiddenColumns.has(col.key)}
                            className={cn('dg-col-dropdown-item', hiddenColumns.has(col.key) && 'dg-col-hidden-item')}
                            onClick={() => onToggle(col.key)}
                        >
                            <span className="dg-col-check">{!hiddenColumns.has(col.key) && <CheckIcon />}</span>
                            {col.header}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

// ─── Inline Edit Cell ────────────────────────────────────────

export const EditableCell = React.memo(function EditableCell({
    value,
    onSave,
    onCancel,
    type = 'text',
    options,
}: {
    value: string;
    onSave: (v: string) => void;
    onCancel: () => void;
    type?: 'text' | 'number' | 'boolean' | 'select';
    options?: string[];
}) {
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') onSave(editValue);
        if (e.key === 'Escape') onCancel();
    }, [editValue, onSave, onCancel]);

    if (type === 'select' && options) {
        return (
            <select
                ref={inputRef as React.RefObject<HTMLSelectElement>}
                value={editValue}
                onChange={(e) => {
                    setEditValue(e.target.value);
                    onSave(e.target.value);
                }}
                onBlur={() => onSave(editValue)}
                onKeyDown={handleKeyDown}
                className="dg-edit-input"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        );
    }

    return (
        <div className="dg-edit-cell">
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type === 'number' ? 'number' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => onSave(editValue)}
                className="dg-edit-input"
                aria-label="Edit cell value"
            />
            <div className="dg-edit-actions">
                <button type="button" onClick={() => onSave(editValue)} className="dg-edit-btn dg-edit-save" aria-label="Save"><CheckIcon /></button>
                <button type="button" onClick={onCancel} className="dg-edit-btn dg-edit-cancel" aria-label="Cancel"><XIcon /></button>
            </div>
        </div>
    );
});

// ─── Resize Handle ───────────────────────────────────────────

export const ResizeHandle = React.memo(function ResizeHandle({ onResize }: { onResize: (delta: number) => void }) {
    const onResizeRef = useRef(onResize);
    onResizeRef.current = onResize;

    const handleMouseDown = useCallback((e: React.MouseEvent): void => {
        e.preventDefault();
        let lastX = e.clientX;
        const handleMove = (ev: MouseEvent): void => {
            const delta = ev.clientX - lastX;
            lastX = ev.clientX;
            onResizeRef.current(delta);
        };
        const handleUp = (): void => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
        };
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }, []);

    return <div className="dg-resize-handle" onMouseDown={handleMouseDown} role="separator" aria-orientation="vertical" />;
});

// ─── Checkbox ────────────────────────────────────────────────

export const DGCheckbox = React.memo(function DGCheckbox({ checked, indeterminate, onChange, label }: { checked: boolean; indeterminate?: boolean; onChange: () => void; label: string }) {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) ref.current.indeterminate = !!indeterminate;
    }, [indeterminate]);
    return (
        <input ref={ref} type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="dg-checkbox" />
    );
});

// ─── Row Action Menu ────────────────────────────────────────

export const RowActionMenu = React.memo(function RowActionMenu<T>({
    actions,
    row,
}: {
    actions: RowAction<T>[];
    row: T;
}) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent): void {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node) &&
                menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleScroll(): void { setOpen(false); }
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [open]);

    const handleToggle = useCallback((e: React.MouseEvent): void => {
        e.stopPropagation();
        if (open) {
            setOpen(false);
            return;
        }
        if (btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            setMenuPos({ top: rect.top, left: rect.right });
        }
        setOpen(true);
    }, [open]);

    return (
        <div ref={wrapRef} className="dg-actions-wrap">
            <button
                ref={btnRef}
                type="button"
                className="dg-actions-btn"
                onClick={handleToggle}
                aria-label="Row actions"
                aria-expanded={open}
            >
                <MoreVerticalIcon />
            </button>
            {open && menuPos && (
                <div
                    ref={menuRef}
                    className="dg-actions-menu"
                    role="menu"
                    style={{ position: 'fixed', bottom: `${window.innerHeight - menuPos.top}px`, left: 'auto', right: `${window.innerWidth - menuPos.left}px`, top: 'auto' }}
                >
                    {actions.map((action, i) => {
                        const isDisabled = action.disabled?.(row) ?? false;
                        return (
                            <button
                                key={i}
                                type="button"
                                role="menuitem"
                                className={cn('dg-actions-item', action.variant === 'danger' && 'dg-actions-item-danger')}
                                disabled={isDisabled}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(false);
                                    action.onClick(row);
                                }}
                            >
                                {action.icon && <span className="dg-actions-icon">{action.icon}</span>}
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}) as <T>(props: { actions: RowAction<T>[]; row: T }) => React.ReactElement;

// ─── Context Menu ───────────────────────────────────────────

export const DGContextMenu = React.memo(function DGContextMenu({
    x,
    y,
    items,
    onClose,
}: {
    x: number;
    y: number;
    items: { label: string; icon?: React.ReactNode; onClick: () => void; variant?: 'default' | 'danger'; separator?: boolean }[];
    onClose: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent): void {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        }
        function handleEsc(e: KeyboardEvent): void {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div ref={ref} className="dg-context-menu" style={{ position: 'fixed', top: y, left: x }} role="menu">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    {item.separator && <div className="dg-context-separator" />}
                    <button
                        type="button"
                        role="menuitem"
                        className={cn('dg-context-item', item.variant === 'danger' && 'dg-context-item-danger')}
                        onClick={() => { item.onClick(); onClose(); }}
                    >
                        {item.icon && <span className="dg-context-icon">{item.icon}</span>}
                        {item.label}
                    </button>
                </React.Fragment>
            ))}
        </div>
    );
});
