'use client';

import React, { useState, useCallback, useMemo, type ReactElement } from 'react';
import { DataGrid } from '../../../../recipes/data-grid/DataGrid';
import type { DataGridColumn, DataGridRowAction } from '../../../../recipes/data-grid/DataGrid';

// ─── Sample Data ─────────────────────────────────────────────

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    role: string;
    salary: number;
    startDate: string;
    status: string;
    location: string;
    performance: string;
}

const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Legal'];
const roles = ['Manager', 'Senior', 'Mid-level', 'Junior', 'Intern', 'Director', 'VP', 'Lead'];
const statuses = ['Active', 'On Leave', 'Remote', 'Hybrid'];
const locations = ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto', 'Singapore'];
const performances = ['Exceptional', 'Exceeds Expectations', 'Meets Expectations', 'Needs Improvement'];

const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 'Kate', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rose', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zach', 'Ava', 'Ben', 'Chloe', 'Dan', 'Ella', 'Finn', 'Gemma', 'Hugo', 'Ivy', 'Jay', 'Kira', 'Liam', 'Maya', 'Nina', 'Oscar', 'Piper', 'Reed', 'Sara', 'Theo', 'Vera', 'Will', 'Zoe', 'Aria', 'Cole'];
const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker'];

function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

const SAMPLE_DATA: Employee[] = Array.from({ length: 50 }, (_, i) => {
    const s = i + 1;
    return {
        id: String(s),
        firstName: firstNames[i % firstNames.length] as string,
        lastName: lastNames[i % lastNames.length] as string,
        email: `${(firstNames[i % firstNames.length] as string).toLowerCase()}.${(lastNames[i % lastNames.length] as string).toLowerCase()}@company.com`,
        department: departments[Math.floor(seededRandom(s) * departments.length)] as string,
        role: roles[Math.floor(seededRandom(s * 2) * roles.length)] as string,
        salary: Math.floor(50000 + seededRandom(s * 3) * 150000),
        startDate: `${2018 + Math.floor(seededRandom(s * 4) * 7)}-${String(1 + Math.floor(seededRandom(s * 5) * 12)).padStart(2, '0')}-${String(1 + Math.floor(seededRandom(s * 6) * 28)).padStart(2, '0')}`,
        status: statuses[Math.floor(seededRandom(s * 7) * statuses.length)] as string,
        location: locations[Math.floor(seededRandom(s * 8) * locations.length)] as string,
        performance: performances[Math.floor(seededRandom(s * 9) * performances.length)] as string,
    };
});

// ─── Feature Toggles ─────────────────────────────────────────

interface FeatureToggle {
    key: string;
    label: string;
    description: string;
    defaultOn: boolean;
}

const FEATURES: FeatureToggle[] = [
    { key: 'sortable', label: 'Sorting', description: 'Click column headers to sort', defaultOn: true },
    { key: 'searchable', label: 'Global Search', description: 'Search across all columns', defaultOn: true },
    { key: 'filterable', label: 'Column Filters', description: 'Filter per column', defaultOn: false },
    { key: 'pagination', label: 'Pagination', description: 'Paginate results', defaultOn: true },
    { key: 'selectable', label: 'Row Selection', description: 'Select rows with checkboxes', defaultOn: false },
    { key: 'editable', label: 'Inline Editing', description: 'Double-click cells to edit', defaultOn: false },
    { key: 'resizable', label: 'Column Resize', description: 'Drag column borders', defaultOn: false },
    { key: 'reorderable', label: 'Column Reorder', description: 'Drag columns to reorder', defaultOn: false },
    { key: 'pinnable', label: 'Column Pinning', description: 'Pin columns left/right', defaultOn: false },
    { key: 'columnToggle', label: 'Column Visibility', description: 'Show/hide columns', defaultOn: false },
    { key: 'expandable', label: 'Row Expansion', description: 'Expand rows for details', defaultOn: false },
    { key: 'exportable', label: 'CSV Export', description: 'Export data to CSV', defaultOn: false },
    { key: 'densityToggle', label: 'Density Toggle', description: 'Switch table density', defaultOn: false },
    { key: 'striped', label: 'Striped Rows', description: 'Alternating row colors', defaultOn: false },
    { key: 'stickyHeader', label: 'Sticky Header', description: 'Header sticks on scroll', defaultOn: true },
    { key: 'rowActions', label: 'Row Actions', description: 'Per-row action menu', defaultOn: false },
    { key: 'freezable', label: 'Column Freezing', description: 'Freeze columns left/right', defaultOn: false },
    { key: 'statusBar', label: 'Status Bar', description: 'Footer with row counts & aggregates', defaultOn: false },
    { key: 'multiSort', label: 'Multi-sort', description: 'Shift+Click for multi-column sort', defaultOn: false },
    { key: 'contextMenu', label: 'Context Menu', description: 'Right-click row for actions', defaultOn: false },
];

// ─── Toggle Switch Component ─────────────────────────────────

function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }): React.ReactElement {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            className="dg-playground-switch"
            data-state={checked ? 'checked' : 'unchecked'}
            onClick={() => onChange(!checked)}
        />
    );
}

// ─── Playground Component ────────────────────────────────────

export function DataGridPlayground(): ReactElement {
    // Feature state
    const [features, setFeatures] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        for (const f of FEATURES) {
            initial[f.key] = f.defaultOn;
        }
        return initial;
    });

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [tableData, setTableData] = useState<Employee[]>(SAMPLE_DATA);

    const getRowKey = useCallback((r: Employee): string => r.id, []);

    const toggleFeature = useCallback((key: string): void => {
        setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const enabledCount = useMemo(() => Object.values(features).filter(Boolean).length, [features]);

    const enableAll = useCallback((): void => {
        const next: Record<string, boolean> = {};
        for (const f of FEATURES) next[f.key] = true;
        setFeatures(next);
    }, []);

    const disableAll = useCallback((): void => {
        const next: Record<string, boolean> = {};
        for (const f of FEATURES) next[f.key] = false;
        setFeatures(next);
    }, []);

    // Handle cell edits by updating local data
    const handleCellEdit = useCallback((rowKey: string, columnKey: string, value: string): void => {
        setTableData((prev) =>
            prev.map((row) => {
                if (row.id !== rowKey) return row;
                return { ...row, [columnKey]: columnKey === 'salary' ? Number(value) || row.salary : value };
            }),
        );
    }, []);

    // Column definitions
    const columns: DataGridColumn<Employee>[] = useMemo(() => [
        {
            key: 'firstName',
            header: 'First Name',
            accessor: (r) => r.firstName,
            sortable: true,
            filterable: true,
            editable: true,
            width: 130,
        },
        {
            key: 'lastName',
            header: 'Last Name',
            accessor: (r) => r.lastName,
            sortable: true,
            filterable: true,
            editable: true,
            width: 130,
        },
        {
            key: 'email',
            header: 'Email',
            accessor: (r) => r.email,
            sortable: true,
            filterable: true,
            width: 240,
        },
        {
            key: 'department',
            header: 'Department',
            accessor: (r) => r.department,
            sortable: true,
            filterable: true,
            editable: true,
            type: 'select' as const,
            options: departments as string[],
            width: 140,
            cellRenderer: (value) => (
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: 'color-mix(in srgb, #8b5cf6 12%, transparent)',
                    color: '#7c3aed',
                }}>
                    {String(value)}
                </span>
            ),
        },
        {
            key: 'role',
            header: 'Role',
            accessor: (r) => r.role,
            sortable: true,
            filterable: true,
            width: 120,
        },
        {
            key: 'salary',
            header: 'Salary',
            accessor: (r) => `$${r.salary.toLocaleString()}`,
            rawValue: (r) => r.salary,
            sortable: true,
            editable: true,
            type: 'number' as const,
            width: 120,
        },
        {
            key: 'startDate',
            header: 'Start Date',
            accessor: (r) => r.startDate,
            sortable: true,
            width: 120,
        },
        {
            key: 'status',
            header: 'Status',
            accessor: (r) => r.status,
            sortable: true,
            filterable: true,
            width: 100,
            cellRenderer: (value) => {
                const s = String(value);
                const colors: Record<string, { bg: string; fg: string }> = {
                    'Active': { bg: 'color-mix(in srgb, #22c55e 12%, transparent)', fg: '#16a34a' },
                    'On Leave': { bg: 'color-mix(in srgb, #f59e0b 12%, transparent)', fg: '#d97706' },
                    'Remote': { bg: 'color-mix(in srgb, #3b82f6 12%, transparent)', fg: '#2563eb' },
                    'Hybrid': { bg: 'color-mix(in srgb, #8b5cf6 12%, transparent)', fg: '#7c3aed' },
                };
                const c = colors[s] ?? { bg: 'transparent', fg: 'inherit' };
                return (
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: c.bg,
                        color: c.fg,
                    }}>
                        {s}
                    </span>
                );
            },
        },
        {
            key: 'location',
            header: 'Location',
            accessor: (r) => r.location,
            sortable: true,
            filterable: true,
            width: 130,
        },
        {
            key: 'performance',
            header: 'Performance',
            accessor: (r) => r.performance,
            sortable: true,
            filterable: true,
            width: 170,
            cellRenderer: (value) => {
                const p = String(value);
                const colors: Record<string, string> = {
                    'Exceptional': '#16a34a',
                    'Exceeds Expectations': '#2563eb',
                    'Meets Expectations': '#d97706',
                    'Needs Improvement': '#dc2626',
                };
                return (
                    <span style={{ color: colors[p] ?? 'inherit', fontWeight: 500, fontSize: '0.8125rem' }}>
                        {p}
                    </span>
                );
            },
        },
    ], []);

    // Row detail renderer
    const renderRowDetail = useCallback((row: Employee) => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8125rem' }}>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Full Name</div>
                <div>{row.firstName} {row.lastName}</div>
            </div>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Email</div>
                <div>{row.email}</div>
            </div>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Department</div>
                <div>{row.department} — {row.role}</div>
            </div>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Compensation</div>
                <div>${row.salary.toLocaleString()}/year</div>
            </div>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Status & Location</div>
                <div>{row.status} — {row.location}</div>
            </div>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Performance Review</div>
                <div>{row.performance}</div>
            </div>
        </div>
    ), []);

    // Row actions
    const rowActionsConfig: DataGridRowAction<Employee>[] = useMemo(() => [
        {
            label: 'View Details',
            onClick: (row) => alert(`Viewing: ${row.firstName} ${row.lastName}\nEmail: ${row.email}\nDepartment: ${row.department}`),
        },
        {
            label: 'Edit',
            onClick: (row) => alert(`Editing: ${row.firstName} ${row.lastName}`),
        },
        {
            label: 'Duplicate',
            onClick: (row) => alert(`Duplicating: ${row.firstName} ${row.lastName}`),
        },
        {
            label: 'Delete',
            variant: 'danger' as const,
            onClick: (row) => alert(`Deleting: ${row.firstName} ${row.lastName}`),
        },
    ], []);

    return (
        <div className="dg-playground">
            {/* Header */}
            <div className="dg-playground-header">
                <div className="dg-playground-title">
                    Feature Toggles
                    <span className="dg-playground-badge">
                        {enabledCount} / {FEATURES.length} enabled
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="dg-toolbar-btn" onClick={enableAll}>
                        Enable All
                    </button>
                    <button type="button" className="dg-toolbar-btn" onClick={disableAll}>
                        Disable All
                    </button>
                </div>
            </div>

            {/* Controls grid */}
            <div className="dg-playground-controls">
                {FEATURES.map((f) => (
                    <label key={f.key} className="dg-playground-toggle" title={f.description}>
                        <ToggleSwitch
                            checked={features[f.key] ?? false}
                            onChange={() => toggleFeature(f.key)}
                            label={f.label}
                        />
                        <span>{f.label}</span>
                    </label>
                ))}
            </div>

            {/* DataGrid */}
            <DataGrid<Employee>
                columns={columns}
                data={tableData}
                getRowKey={getRowKey}
                sortable={features.sortable}
                searchable={features.searchable}
                filterable={features.filterable}
                selectable={features.selectable}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                editable={features.editable}
                onCellEdit={handleCellEdit}
                pageSize={features.pagination ? 10 : undefined}
                resizable={features.resizable}
                reorderable={features.reorderable}
                pinnable={features.pinnable}
                columnToggle={features.columnToggle}
                expandable={features.expandable}
                renderRowDetail={renderRowDetail}
                exportable={features.exportable}
                densityToggle={features.densityToggle}
                striped={features.striped}
                stickyHeader={features.stickyHeader}
                rowActions={features.rowActions ? rowActionsConfig : undefined}
                freezable={features.freezable}
                statusBar={features.statusBar}
                multiSort={features.multiSort}
                contextMenu={features.contextMenu}
                caption="Employee directory"
            />
        </div>
    );
}
