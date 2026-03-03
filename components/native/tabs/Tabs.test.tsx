import { render, screen } from '@testing-library/react-native';

import { Tabs } from './Tabs';

describe('Tabs (Native)', () => {
    it('renders with default props', () => {
        render(<Tabs defaultValue="tab1"><></></Tabs>);
        expect(screen.root).toBeTruthy();
    });
});
