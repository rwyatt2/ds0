import { render, screen } from '@testing-library/react';
import { ChatBubble } from './ChatBubble';
describe('ChatBubble (Styled)', () => { it('renders', () => { render(<ChatBubble messages={[{ id: '1', content: 'Hi', sender: 'bot' }]} />); expect(screen.getByText('Hi')).toBeInTheDocument(); }); });
