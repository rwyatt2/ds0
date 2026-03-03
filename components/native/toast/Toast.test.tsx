import { render, screen } from '@testing-library/react-native';

import { Toast } from './Toast';

describe('Toast (Native)', () => {
    it('renders title and description', () => {
        render(<Toast title="Hello" description="World" />);
        expect(screen.getByText('Hello')).toBeTruthy();
        expect(screen.getByText('World')).toBeTruthy();
    });
});
