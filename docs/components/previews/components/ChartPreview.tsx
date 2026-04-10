'use client';

import { Chart } from '../../../../components/react/chart';
import { Stack } from '../../../../components/react/stack';

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const barDatasets = [
    { label: 'Revenue', data: [4200, 5800, 4900, 6300, 7100, 6800], color: '#3b82f6' },
    { label: 'Expenses', data: [3100, 3900, 4200, 3800, 4500, 4100], color: '#ef4444' },
];

const lineDatasets = [
    { label: 'Users', data: [120, 180, 250, 310, 420, 580], color: '#10b981' },
];

export function ChartPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-2xl">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Bar chart</p>
                <Chart type="bar" labels={labels} datasets={barDatasets} title="Revenue vs Expenses" />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Line chart</p>
                <Chart type="line" labels={labels} datasets={lineDatasets} title="User Growth" />
            </div>
        </Stack>
    );
}
