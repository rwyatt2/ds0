import { render, screen } from '@testing-library/react';
import { TourPrimitive } from './Tour';
describe('TourPrimitive', () => {
    const steps = [{ id: '1', title: 'Welcome', content: 'Intro' }];
    it('renders when active', () => { render(<TourPrimitive steps={steps} active />); expect(screen.getByText('Welcome')).toBeInTheDocument(); });
    it('hidden when inactive', () => { const { container } = render(<TourPrimitive steps={steps} active={false} />); expect(container.innerHTML).toBe(''); });
});
