import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Confetti } from './Confetti';
expect.extend(toHaveNoViolations);

describe('Confetti (Styled)', () => {
    it('renders nothing when not active', () => { const { container } = render(<Confetti />); expect(container.firstChild).toBeNull(); });
    it('renders when active', () => { const { container } = render(<Confetti isActive />); expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull(); });
    it('is aria-hidden for accessibility', () => { const { container } = render(<Confetti isActive />); expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Confetti isActive />); expect(await axe(container)).toHaveNoViolations(); });
    it('merges className', () => { const { container } = render(<Confetti isActive className="custom" />); expect(container.querySelector('.custom')).not.toBeNull(); });
});
