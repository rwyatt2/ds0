import { render, screen } from '@testing-library/react-native';

import { Card } from './Card';

describe('Card (Native)', () => {
    it('renders with default props', () => {
        render(<Card><></></Card>);
        expect(screen.root).toBeTruthy();
    });
});
