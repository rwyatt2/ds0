import { forwardRef } from 'react';
import type { SparklineProps } from './Sparkline.types';
import { useSparkline } from './useSparkline';

const SparklinePrimitive = forwardRef<SVGSVGElement, SparklineProps>(
    ({ data, width = 120, height = 32, strokeWidth = 1.5, color = 'currentColor', fillOpacity = 0.1, showDot, ...rest }, ref) => {
        const { sparklineProps, pathD, fillD, lastPoint } = useSparkline({ data, width, height, strokeWidth, color });
        if (!data.length) return <svg ref={ref} width={width} height={height} {...rest} {...sparklineProps} />;
        return (
            <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...rest} {...sparklineProps}>
                {fillOpacity > 0 && <path d={fillD} fill={color} opacity={fillOpacity} />}
                <path d={pathD} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                {showDot && lastPoint && <circle cx={lastPoint.x} cy={lastPoint.y} r={strokeWidth + 1} fill={color} />}
            </svg>
        );
    },
);
SparklinePrimitive.displayName = 'SparklinePrimitive';
export { SparklinePrimitive };
