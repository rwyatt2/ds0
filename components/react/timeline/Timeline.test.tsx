import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Timeline, TimelineItem, TimelineDot, TimelineContent } from './Timeline';
expect.extend(toHaveNoViolations);
describe('Timeline (Styled)', () => {
    it('renders items', () => { render(<Timeline><TimelineItem><TimelineDot /><TimelineContent>Event 1</TimelineContent></TimelineItem></Timeline>); expect(screen.getByText('Event 1')).toBeInTheDocument(); });
    it('merges className', () => { const { container } = render(<Timeline className="custom"><TimelineItem><TimelineDot /><TimelineContent>E</TimelineContent></TimelineItem></Timeline>); expect(container.firstChild).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Timeline><TimelineItem><TimelineDot /><TimelineContent>E</TimelineContent></TimelineItem></Timeline>); expect(await axe(container)).toHaveNoViolations(); });
});
