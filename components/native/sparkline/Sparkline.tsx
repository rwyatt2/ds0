import React, { forwardRef } from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import type { StyledSparklineProps } from '@ds0/primitives';

const Sparkline = forwardRef<React.ElementRef<typeof View>, StyledSparklineProps>(
    ({ data, width = 120, height = 32, color = '#10b981', strokeWidth = 1.5, ...props }, ref) => {
        if (!data.length) return null;
        const min = Math.min(...data); const max = Math.max(...data); const range = max - min || 1;
        const pts = data.map((v, i) => ({ x: (i / (data.length - 1 || 1)) * width, y: (1 - (v - min) / range) * height }));
        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('');
        const last = pts[pts.length - 1];
        return (<View ref={ref} {...props}><Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}><Path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />{last && <Circle cx={last.x} cy={last.y} r={strokeWidth + 0.5} fill={color} />}</Svg></View>);
    },
);
Sparkline.displayName = 'Sparkline';
export { Sparkline };
