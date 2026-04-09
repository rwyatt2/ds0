import { render } from '@testing-library/react-native';
import { ScrollArea } from './ScrollArea';
import { Text } from 'react-native';

describe('ScrollArea (Native)', () => {
    it('renders children', () => {
        const { getByText } = render(<ScrollArea><Text>Content</Text></ScrollArea>);
        expect(getByText('Content')).toBeTruthy();
    });
});
