import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useSparkline } from '@ds0/primitives';
import type { StyledSparklineProps } from '@ds0/primitives';

const sizeMap = { sm: { w: 80, h: 20 }, md: { w: 120, h: 32 }, lg: { w: 180, h: 48 } };
const variantColors = { default: 'currentColor', success: '#10b981', danger: '#ef4444' };

const Sparkline = forwardRef<SVGSVGElement, StyledSparklineProps>(
    ({ className, variant = 'default', size = 'md', animated, data, strokeWidth = 1.5, fillOpacity = 0.1, showDot = true, ...props }, ref) => {
        const { w, h } = sizeMap[size];
        const color = variantColors[variant];
        const { sparklineProps, pathD, fillD, lastPoint } = useSparkline({ data, width: w, height: h, strokeWidth, color });

        if (!data.length) return <svg ref={ref} width={w} height={h} className={className} {...props} {...sparklineProps} />;

        return (
            <svg ref={ref} width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={cn('inline-block', className)} {...props} {...sparklineProps}>
                <defs>
                    <linearGradient id={`sp-fill-${variant}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <path d={fillD} fill={`url(#sp-fill-${variant})`} />
                <path d={pathD} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={animated ? 'transition-all duration-500' : ''} />
                {showDot && lastPoint && <circle cx={lastPoint.x} cy={lastPoint.y} r={strokeWidth + 0.5} fill={color} className={animated ? 'transition-all duration-500' : ''} />}
            </svg>
        );
    },
);
Sparkline.displayName = 'Sparkline';
export { Sparkline };
export type { StyledSparklineProps as SparklineProps };
