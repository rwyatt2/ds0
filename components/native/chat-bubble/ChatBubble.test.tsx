import { render } from '@testing-library/react-native';
import { ChatBubble } from './ChatBubble';
describe('ChatBubble (Native)', () => { it('renders', () => { const { toJSON } = render(<ChatBubble messages={[{ id: '1', content: 'Hi', sender: 'bot' }]} />); expect(toJSON()).not.toBeNull(); }); });
