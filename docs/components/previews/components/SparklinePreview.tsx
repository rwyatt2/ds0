'use client';

import { Sparkline } from '../../../../components/react/sparkline';
import { Stack } from '../../../../components/react/stack';

const uptrend = [10, 12, 8, 14, 18, 15, 22, 28, 25, 30, 35];
const downtrend = [35, 30, 28, 25, 22, 18, 20, 15, 12, 10, 8];
const volatile = [20, 35, 15, 40, 10, 30, 25, 45, 20, 38, 28];

export function SparklinePreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">Revenue</p>
                    <p className="text-xs text-muted-foreground">Uptrend</p>
                </div>
                <Sparkline data={uptrend} variant="success" size="md" />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">Churn Rate</p>
                    <p className="text-xs text-muted-foreground">Downtrend</p>
                </div>
                <Sparkline data={downtrend} variant="danger" size="md" />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">Traffic</p>
                    <p className="text-xs text-muted-foreground">Volatile</p>
                </div>
                <Sparkline data={volatile} variant="default" size="lg" />
            </div>
        </Stack>
    );
}
