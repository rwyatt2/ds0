'use client';

import React, { useState, useCallback, useMemo, type ReactElement } from 'react';
import { Chart } from '../../../../recipes/chart/Chart';
import type { ChartType, ChartSeries, DonutSegment } from '../../../../recipes/chart/Chart';

// ─── Sample Data Generators ──────────────────────────────────

function seededRandom(seed: number): number {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateLineSeries(): ChartSeries[] {
    return [
        {
            name: 'Revenue',
            data: MONTHS.map((m, i) => ({ x: m, y: Math.round(4000 + Math.sin(i * 0.8) * 2000 + i * 400) })),
        },
        {
            name: 'Costs',
            data: MONTHS.map((m, i) => ({ x: m, y: Math.round(2000 + Math.cos(i * 0.6) * 800 + i * 150) })),
        },
        {
            name: 'Profit',
            data: MONTHS.map((m, i) => ({ x: m, y: Math.round(1500 + Math.sin(i * 1.2) * 1200 + i * 250) })),
        },
    ];
}

function generateBarSeries(): ChartSeries[] {
    const categories = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'];
    return [
        {
            name: 'Q1',
            data: categories.map((c, i) => ({ x: c, y: Math.round(50 + seededRandom(i + 1) * 50) })),
        },
        {
            name: 'Q2',
            data: categories.map((c, i) => ({ x: c, y: Math.round(50 + seededRandom(i + 10) * 50) })),
        },
    ];
}

function generateDonutSegments(): DonutSegment[] {
    return [
        { label: 'Desktop', value: 54.8 },
        { label: 'Mobile', value: 32.1 },
        { label: 'Tablet', value: 8.4 },
        { label: 'Other', value: 4.7 },
    ];
}

function generateScatterSeries(): ChartSeries[] {
    return [
        {
            name: 'Dataset A',
            data: Array.from({ length: 25 }, (_, i) => ({
                x: Math.round(10 + seededRandom(i * 3) * 80),
                y: Math.round(20 + seededRandom(i * 7) * 60),
            })),
        },
        {
            name: 'Dataset B',
            data: Array.from({ length: 20 }, (_, i) => ({
                x: Math.round(15 + seededRandom(i * 5 + 100) * 70),
                y: Math.round(10 + seededRandom(i * 9 + 100) * 70),
            })),
        },
    ];
}

function generateSparklineSeries(): ChartSeries[] {
    return [
        {
            name: 'Trend',
            data: [12, 18, 14, 22, 19, 25, 28, 24, 30, 27, 35, 32].map((y, i) => ({ x: i, y })),
        },
    ];
}

// ─── Chart Type Config ───────────────────────────────────────

interface ChartTypeOption {
    type: ChartType;
    label: string;
    description: string;
}

const CHART_TYPES: ChartTypeOption[] = [
    { type: 'line', label: 'Line', description: 'Trends over time' },
    { type: 'bar', label: 'Bar', description: 'Category comparison' },
    { type: 'area', label: 'Area', description: 'Volume over time' },
    { type: 'donut', label: 'Donut', description: 'Part-to-whole' },
    { type: 'scatter', label: 'Scatter', description: 'Correlation' },
    { type: 'sparkline', label: 'Sparkline', description: 'Inline trend' },
];

// ─── Feature Toggles ─────────────────────────────────────────

interface FeatureToggle {
    key: string;
    label: string;
    description: string;
    defaultOn: boolean;
    /** Chart types where this toggle applies */
    appliesTo?: ChartType[];
}

const FEATURES: FeatureToggle[] = [
    { key: 'grid', label: 'Grid Lines', description: 'Background grid', defaultOn: true, appliesTo: ['line', 'bar', 'area', 'scatter'] },
    { key: 'legend', label: 'Legend', description: 'Series legend', defaultOn: true },
    { key: 'tooltip', label: 'Tooltips', description: 'Hover tooltips', defaultOn: true },
    { key: 'animated', label: 'Animations', description: 'Entrance animations', defaultOn: true },
    { key: 'showPoints', label: 'Data Points', description: 'Show dots on lines', defaultOn: true, appliesTo: ['line', 'area'] },
    { key: 'stacked', label: 'Stacked', description: 'Stack series', defaultOn: false, appliesTo: ['bar', 'area'] },
    { key: 'horizontal', label: 'Horizontal', description: 'Horizontal bars', defaultOn: false, appliesTo: ['bar'] },
    { key: 'smoothCurve', label: 'Smooth Curve', description: 'Catmull-Rom vs linear', defaultOn: true, appliesTo: ['line', 'area'] },
];

// ─── Toggle Switch ───────────────────────────────────────────

function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }): ReactElement {
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

// ─── Playground ──────────────────────────────────────────────

export function ChartPlayground(): ReactElement {
    const [selectedType, setSelectedType] = useState<ChartType>('line');
    const [features, setFeatures] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        for (const f of FEATURES) {
            initial[f.key] = f.defaultOn;
        }
        return initial;
    });

    const toggleFeature = useCallback((key: string): void => {
        setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    // Filter applicable toggles
    const applicableFeatures = useMemo(
        () => FEATURES.filter((f) => !f.appliesTo || f.appliesTo.includes(selectedType)),
        [selectedType],
    );

    const enabledCount = useMemo(
        () => applicableFeatures.filter((f) => features[f.key]).length,
        [applicableFeatures, features],
    );

    // Get chart props based on type and toggles
    const chartProps = useMemo(() => {
        const base = {
            grid: features.grid ?? true,
            legend: features.legend ?? true,
            tooltip: features.tooltip ?? true,
            animated: features.animated ?? true,
            showPoints: features.showPoints ?? true,
            stacked: features.stacked ?? false,
            horizontal: features.horizontal ?? false,
            curve: (features.smoothCurve ? 'smooth' : 'linear') as 'smooth' | 'linear',
        };

        switch (selectedType) {
            case 'line':
                return {
                    ...base,
                    type: 'line' as const,
                    series: generateLineSeries(),
                    title: 'Monthly Revenue Trends',
                    xLabel: 'Month',
                    yLabel: 'Amount ($)',
                    height: 360,
                };
            case 'bar':
                return {
                    ...base,
                    type: 'bar' as const,
                    series: generateBarSeries(),
                    title: 'Department Performance by Quarter',
                    height: 360,
                };
            case 'area':
                return {
                    ...base,
                    type: 'area' as const,
                    series: generateLineSeries().slice(0, 2),
                    title: 'Revenue vs Costs Over Time',
                    height: 360,
                };
            case 'donut':
                return {
                    ...base,
                    type: 'donut' as const,
                    segments: generateDonutSegments(),
                    title: 'Traffic by Device',
                    centerValue: '100%',
                    centerLabel: 'Total',
                    height: 340,
                };
            case 'scatter':
                return {
                    ...base,
                    type: 'scatter' as const,
                    series: generateScatterSeries(),
                    title: 'Feature Correlation',
                    xLabel: 'Engagement Score',
                    yLabel: 'Conversion Rate',
                    height: 360,
                };
            case 'sparkline':
                return {
                    ...base,
                    type: 'sparkline' as const,
                    series: generateSparklineSeries(),
                    height: 48,
                    width: 200,
                    legend: false,
                    tooltip: false,
                    grid: false,
                };
            default:
                return { ...base, type: 'line' as const, series: [], height: 360 };
        }
    }, [selectedType, features]);

    return (
        <div className="dg-playground">
            {/* Chart Type Selector */}
            <div className="dg-playground-header">
                <div className="dg-playground-title">
                    Chart Type
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: '0 0 1rem' }}>
                {CHART_TYPES.map((ct) => (
                    <button
                        key={ct.type}
                        type="button"
                        className="dg-toolbar-btn"
                        style={{
                            background: selectedType === ct.type ? 'var(--fd-primary, #8b5cf6)' : undefined,
                            color: selectedType === ct.type ? '#fff' : undefined,
                            borderColor: selectedType === ct.type ? 'transparent' : undefined,
                        }}
                        onClick={() => setSelectedType(ct.type)}
                        title={ct.description}
                    >
                        {ct.label}
                    </button>
                ))}
            </div>

            {/* Feature Toggles */}
            <div className="dg-playground-header">
                <div className="dg-playground-title">
                    Feature Toggles
                    <span className="dg-playground-badge">
                        {enabledCount} / {applicableFeatures.length} enabled
                    </span>
                </div>
            </div>
            <div className="dg-playground-controls">
                {applicableFeatures.map((f) => (
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

            {/* Chart */}
            <div style={{ padding: '1rem 0' }}>
                <Chart {...chartProps} />
            </div>

            {/* Sparkline demo: multiple in a row */}
            {selectedType === 'sparkline' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1rem 0', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--fd-muted-foreground, #71717a)' }}>Revenue</span>
                        <Chart type="sparkline" series={[{ name: 'Rev', data: [4, 7, 5, 9, 6, 8, 12, 10].map((y, i) => ({ x: i, y })) }]} height={32} width={120} legend={false} tooltip={false} grid={false} animated={false} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>$12.4k</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--fd-muted-foreground, #71717a)' }}>Users</span>
                        <Chart type="sparkline" series={[{ name: 'Users', data: [20, 22, 18, 25, 28, 24, 30, 35].map((y, i) => ({ x: i, y })) }]} height={32} width={120} legend={false} tooltip={false} grid={false} animated={false} colors={['#22c55e']} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>+35</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--fd-muted-foreground, #71717a)' }}>Bounce Rate</span>
                        <Chart type="sparkline" series={[{ name: 'Bounce', data: [45, 42, 48, 40, 38, 42, 35, 33].map((y, i) => ({ x: i, y })) }]} height={32} width={120} legend={false} tooltip={false} grid={false} animated={false} colors={['#ef4444']} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>33%</span>
                    </div>
                </div>
            )}
        </div>
    );
}
