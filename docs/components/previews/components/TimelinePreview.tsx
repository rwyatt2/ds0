'use client';

import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent } from '../../../../components/react/timeline';

export function TimelinePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <Timeline>
                <TimelineItem>
                    <TimelineDot className="bg-primary" />
                    <TimelineConnector />
                    <TimelineContent>
                        <p className="text-sm font-semibold">Project Created</p>
                        <p className="text-xs text-muted-foreground">Jan 15, 2026</p>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineDot className="bg-primary" />
                    <TimelineConnector />
                    <TimelineContent>
                        <p className="text-sm font-semibold">Design System v1.0</p>
                        <p className="text-xs text-muted-foreground">Feb 20, 2026</p>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineDot className="bg-primary" />
                    <TimelineConnector />
                    <TimelineContent>
                        <p className="text-sm font-semibold">95 Components Shipped</p>
                        <p className="text-xs text-muted-foreground">Mar 28, 2026</p>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineDot className="bg-muted-foreground/50" />
                    <TimelineContent>
                        <p className="text-sm font-semibold text-muted-foreground">v2.0 Roadmap</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    );
}
