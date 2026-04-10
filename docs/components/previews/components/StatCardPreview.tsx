'use client';

import { StatCard } from '../../../../components/react/stat-card';
import { Stack } from '../../../../components/react/stack';

export function StatCardPreview(): React.ReactElement {
    return (
        <Stack direction="horizontal" gap="4" className="w-full flex-wrap">
            <StatCard
                label="Revenue"
                value="$45,231"
                trend={12.5}
                trendLabel="vs last month"
                className="flex-1 min-w-[180px]"
            />
            <StatCard
                label="Users"
                value="2,350"
                trend={8.2}
                trendLabel="vs last month"
                className="flex-1 min-w-[180px]"
            />
            <StatCard
                label="Bounce Rate"
                value="24.3%"
                trend={-3.1}
                trendLabel="vs last month"
                className="flex-1 min-w-[180px]"
            />
        </Stack>
    );
}
