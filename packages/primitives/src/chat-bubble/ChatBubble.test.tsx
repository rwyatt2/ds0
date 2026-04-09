import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChatBubblePrimitive } from './ChatBubble';
expect.extend(toHaveNoViolations);
describe('ChatBubblePrimitive', () => {
    const msgs = [{ id: '1', content: 'Hello', sender: 'user' as const }];
    it('renders messages', () => { render(<ChatBubblePrimitive messages={msgs} />); expect(screen.getByText('Hello')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<ChatBubblePrimitive messages={msgs} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<ChatBubblePrimitive ref={ref} messages={[]} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
