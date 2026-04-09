import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { styled } from 'nativewind';
import type { StyledChartProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);
const Chart = forwardRef<React.ElementRef<typeof View>, StyledChartProps>(({ labels, datasets, title, type = 'bar', ...props }, ref) => {
    const max = Math.max(...datasets.flatMap(d => d.data), 1);
    const w = 300, h = 200;
    return (
        <StyledView ref={ref} className="rounded-lg border p-4 bg-white" accessibilityRole="image" accessibilityLabel="Chart" {...props}>
            {title && <StyledText className="font-semibold text-sm mb-2">{title}</StyledText>}
            <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
                {type === 'bar' && datasets[0]?.data.map((v, i) => {
                    const bw = (w - 40) / labels.length * 0.6;
                    const bh = (v / max) * (h - 30);
                    return <Rect key={i} x={20 + i * ((w - 40) / labels.length)} y={h - 20 - bh} width={bw} height={bh} fill={datasets[0].color || '#3b82f6'} rx={3} />;
                })}
            </Svg>
        </StyledView>
    );
});
Chart.displayName = 'Chart';
export { Chart };
