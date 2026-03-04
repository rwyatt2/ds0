import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
    title: 'Recipes/Data Visualization/Chart',
    component: Chart,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Chart>;

// ─── Sample Data ─────────────────────────────────────────────

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const revenueSeries = [
    {
        name: 'Revenue',
        data: months.map((m, i) => ({ x: m, y: 4000 + Math.sin(i * 0.8) * 2000 + i * 400 })),
    },
    {
        name: 'Costs',
        data: months.map((m, i) => ({ x: m, y: 2000 + Math.cos(i * 0.6) * 800 + i * 150 })),
    },
];

const barData = [
    {
        name: 'Q1',
        data: [
            { x: 'Engineering', y: 85 },
            { x: 'Design', y: 72 },
            { x: 'Marketing', y: 63 },
            { x: 'Sales', y: 91 },
        ],
    },
    {
        name: 'Q2',
        data: [
            { x: 'Engineering', y: 78 },
            { x: 'Design', y: 88 },
            { x: 'Marketing', y: 75 },
            { x: 'Sales', y: 82 },
        ],
    },
];

const donutData = [
    { label: 'Desktop', value: 54.8 },
    { label: 'Mobile', value: 32.1 },
    { label: 'Tablet', value: 8.4 },
    { label: 'Other', value: 4.7 },
];

const scatterData = [
    {
        name: 'Dataset A',
        data: Array.from({ length: 30 }, (_, i) => ({
            x: Math.round(10 + Math.sin(i * 0.5) * 40 + i * 2),
            y: Math.round(20 + Math.cos(i * 0.3) * 30 + i * 1.5),
        })),
    },
];

const sparklineData = [
    { name: 'Trend', data: [12, 18, 14, 22, 19, 25, 28, 24, 30, 27, 35, 32].map((y, i) => ({ x: i, y })) },
];

// ─── Stories ─────────────────────────────────────────────────

export const LineChart: Story = {
    args: {
        type: 'line',
        series: revenueSeries,
        title: 'Monthly Revenue & Costs',
        xLabel: 'Month',
        yLabel: 'Amount ($)',
        height: 320,
    },
};

export const AreaChart: Story = {
    args: {
        type: 'area',
        series: revenueSeries,
        title: 'Revenue vs Costs',
        height: 320,
    },
};

export const StackedAreaChart: Story = {
    args: {
        type: 'area',
        series: revenueSeries,
        title: 'Stacked Revenue Overview',
        stacked: true,
        height: 320,
    },
};

export const BarChart: Story = {
    args: {
        type: 'bar',
        series: barData,
        title: 'Department Scores by Quarter',
        height: 320,
    },
};

export const StackedBarChart: Story = {
    args: {
        type: 'bar',
        series: barData,
        title: 'Stacked Scores',
        stacked: true,
        height: 320,
    },
};

export const HorizontalBarChart: Story = {
    args: {
        type: 'bar',
        series: [barData[0]!],
        title: 'Horizontal Scores',
        horizontal: true,
        height: 280,
    },
};

export const DonutChart: Story = {
    args: {
        type: 'donut',
        segments: donutData,
        title: 'Traffic by Device',
        centerValue: '100%',
        centerLabel: 'Total',
        height: 300,
    },
};

export const ScatterPlot: Story = {
    args: {
        type: 'scatter',
        series: scatterData,
        title: 'Correlation Plot',
        xLabel: 'Variable A',
        yLabel: 'Variable B',
        height: 320,
    },
};

export const Sparkline: Story = {
    args: {
        type: 'sparkline',
        series: sparklineData,
        height: 40,
        width: 160,
        legend: false,
        tooltip: false,
        grid: false,
        animated: false,
    },
};

export const LinearCurve: Story = {
    args: {
        type: 'line',
        series: [revenueSeries[0]!],
        title: 'Linear Interpolation',
        curve: 'linear',
        height: 280,
    },
};

export const NoGrid: Story = {
    args: {
        type: 'line',
        series: [revenueSeries[0]!],
        title: 'Without Grid',
        grid: false,
        height: 280,
    },
};

export const Loading: Story = {
    args: {
        type: 'line',
        series: revenueSeries,
        isLoading: true,
        height: 300,
    },
};

export const EmptyState: Story = {
    args: {
        type: 'line',
        series: [],
        emptyMessage: 'No data available yet.',
        height: 300,
    },
};
