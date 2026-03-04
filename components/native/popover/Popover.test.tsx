import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './Popover';

describe('Popover (Native)', () => {
    it('renders trigger', () => {
        render(
            <Popover>
                <PopoverTrigger><Text>Open</Text></PopoverTrigger>
                <PopoverContent><Text>Content</Text></PopoverContent>
            </Popover>,
        );
        expect(screen.getByText('Open')).toBeTruthy();
    });

    it('does not show content by default', () => {
        render(
            <Popover>
                <PopoverTrigger><Text>Open</Text></PopoverTrigger>
                <PopoverContent><Text>Content</Text></PopoverContent>
            </Popover>,
        );
        expect(screen.queryByText('Content')).toBeNull();
    });

    it('shows content when defaultOpen is true', () => {
        render(
            <Popover defaultOpen>
                <PopoverTrigger><Text>Open</Text></PopoverTrigger>
                <PopoverContent><Text>Content</Text></PopoverContent>
            </Popover>,
        );
        expect(screen.getByText('Content')).toBeTruthy();
    });

    it('toggles content on trigger press', () => {
        render(
            <Popover>
                <PopoverTrigger><Text>Open</Text></PopoverTrigger>
                <PopoverContent><Text>Content</Text></PopoverContent>
            </Popover>,
        );
        fireEvent.press(screen.getByText('Open'));
        expect(screen.getByText('Content')).toBeTruthy();
    });

    it('closes content via PopoverClose', () => {
        render(
            <Popover defaultOpen>
                <PopoverTrigger><Text>Open</Text></PopoverTrigger>
                <PopoverContent>
                    <Text>Content</Text>
                    <PopoverClose><Text>Close</Text></PopoverClose>
                </PopoverContent>
            </Popover>,
        );
        fireEvent.press(screen.getByText('Close'));
        expect(screen.queryByText('Content')).toBeNull();
    });

    it('calls onOpenChange when toggled', () => {
        const onOpenChange = vi.fn();
        render(
            <Popover onOpenChange={onOpenChange}>
                <PopoverTrigger><Text>Open</Text></PopoverTrigger>
                <PopoverContent><Text>Content</Text></PopoverContent>
            </Popover>,
        );
        fireEvent.press(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('has correct accessibility attributes on trigger', () => {
        render(
            <Popover>
                <PopoverTrigger accessibilityLabel="Show menu"><Text>Open</Text></PopoverTrigger>
                <PopoverContent><Text>Content</Text></PopoverContent>
            </Popover>,
        );
        const trigger = screen.getByLabelText('Show menu');
        expect(trigger).toBeTruthy();
    });
});
