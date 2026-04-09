import type { UseTimelineProps, UseTimelineReturn } from './Timeline.types';
export function useTimeline(props: UseTimelineProps = {}): UseTimelineReturn {
    const { orientation = 'vertical' } = props;
    return { timelineProps: { role: 'list', 'aria-label': 'Timeline', 'aria-orientation': orientation } };
}
