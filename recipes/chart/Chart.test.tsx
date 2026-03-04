/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Chart } from './Chart';

// ResizeObserver is not available in jsdom — provide a minimal mock
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe(): void { }
        unobserve(): void { }
        disconnect(): void { }
    };
});

afterEach(() => {
    cleanup();
});

expect.extend(toHaveNoViolations);

const lineSeries = [
    {
        name: 'Revenue',
        data: [
            { x: 'Jan', y: 4000 },
            { x: 'Feb', y: 5200 },
            { x: 'Mar', y: 4800 },
            { x: 'Apr', y: 6100 },
        ],
    },
    {
        name: 'Costs',
        data: [
            { x: 'Jan', y: 2400 },
            { x: 'Feb', y: 2800 },
            { x: 'Mar', y: 2600 },
            { x: 'Apr', y: 3100 },
        ],
    },
];

const donutSegments = [
    { label: 'Desktop', value: 60 },
    { label: 'Mobile', value: 30 },
    { label: 'Tablet', value: 10 },
];

describe('Chart', () => {
    describe('line chart', () => {
        it('renders with accessible label', () => {
            render(<Chart type="line" series={lineSeries} title="Revenue Trend" />);
            const svg = document.querySelector('svg[role="img"]');
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveAttribute('aria-label', 'Revenue Trend');
        });

        it('renders axis tick labels', () => {
            render(<Chart type="line" series={lineSeries} title="Revenue Trend" />);
            // Ticks appear in SVG and also in the accessible data table
            expect(screen.getAllByText('Jan').length).toBeGreaterThanOrEqual(1);
            expect(screen.getAllByText('Apr').length).toBeGreaterThanOrEqual(1);
        });

        it('renders legend items for each series', () => {
            render(<Chart type="line" series={lineSeries} legend />);
            const legendButtons = screen.getAllByRole('button');
            const legendNames = legendButtons.map(b => b.textContent);
            expect(legendNames).toContain('Revenue');
            expect(legendNames).toContain('Costs');
        });

        it('toggles series visibility via legend click', async () => {
            const user = userEvent.setup();
            render(<Chart type="line" series={lineSeries} legend />);
            const revenueBtns = screen.getAllByRole('button', { name: /Revenue/ });
            const revenueBtn = revenueBtns[0]!;
            await user.click(revenueBtn);
            expect(revenueBtn).toHaveAttribute('data-hidden', 'true');
        });
    });

    describe('bar chart', () => {
        it('renders bar chart type', () => {
            render(<Chart type="bar" series={[lineSeries[0]!]} title="Bar Chart" />);
            const bars = document.querySelectorAll('.vc-bar');
            expect(bars.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('area chart', () => {
        it('renders area fills', () => {
            render(<Chart type="area" series={[lineSeries[0]!]} title="Area Chart" />);
            const fills = document.querySelectorAll('.vc-area-fill');
            expect(fills.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('donut chart', () => {
        it('renders donut arcs', () => {
            render(<Chart type="donut" segments={donutSegments} title="Devices" />);
            const arcs = document.querySelectorAll('.vc-arc');
            expect(arcs).toHaveLength(3);
        });

        it('renders center text', () => {
            render(<Chart type="donut" segments={donutSegments} centerValue="100" centerLabel="Total" />);
            expect(screen.getByText('100')).toBeInTheDocument();
            expect(screen.getByText('Total')).toBeInTheDocument();
        });
    });

    describe('scatter chart', () => {
        it('renders scatter points', () => {
            const scatterSeries = [{
                name: 'Data',
                data: [
                    { x: 1, y: 10 },
                    { x: 2, y: 20 },
                    { x: 3, y: 15 },
                ],
            }];
            render(<Chart type="scatter" series={scatterSeries} title="Scatter" />);
            const points = document.querySelectorAll('.vc-scatter-point');
            expect(points).toHaveLength(3);
        });
    });

    describe('sparkline', () => {
        it('renders a compact sparkline', () => {
            render(
                <Chart
                    type="sparkline"
                    series={[{ name: 'Trend', data: [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 15 }] }]}
                    height={40}
                    width={120}
                />,
            );
            const path = document.querySelector('.vc-sparkline-line');
            expect(path).toBeInTheDocument();
        });
    });

    describe('states', () => {
        it('renders loading skeleton', () => {
            const { container } = render(<Chart type="line" series={lineSeries} isLoading />);
            expect(container.querySelector('.vc-skeleton')).toBeInTheDocument();
        });

        it('renders empty state when no data', () => {
            render(<Chart type="line" series={[]} emptyMessage="No data yet." />);
            expect(screen.getByText('No data yet.')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations for line chart', async () => {
            const { container } = render(<Chart type="line" series={lineSeries} title="Accessible Line" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations for donut chart', async () => {
            const { container } = render(<Chart type="donut" segments={donutSegments} title="Accessible Donut" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('provides a hidden data table for screen readers', () => {
            render(<Chart type="line" series={lineSeries} title="Revenue Data" />);
            // The accessible table caption + SVG title both contain the text
            const elements = screen.getAllByText('Revenue Data');
            expect(elements.length).toBeGreaterThanOrEqual(1);
        });
    });
});
