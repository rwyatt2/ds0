import React from 'react';
import { render } from '@testing-library/react-native';
import { Drawer, DrawerTitle } from './Drawer';

// Basic smoke test — full integration requires native runtime
describe('Drawer (Native)', () => {
    it('renders when open', () => {
        const { getByText } = render(
            <Drawer open>
                <DrawerTitle>Test Drawer</DrawerTitle>
            </Drawer>,
        );
        expect(getByText('Test Drawer')).toBeTruthy();
    });
});
