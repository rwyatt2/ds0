import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

describe('Tooltip (Native)', () => {
    it('renders trigger', () => {
        render(
            <Tooltip>
                <TooltipTrigger><Text>Hover me</Text></TooltipTrigger>
                <TooltipContent><Text>Tip text</Text></TooltipContent>
            </Tooltip>,
        );
        expect(screen.getByText('Hover me')).toBeTruthy();
    });

    it('does not show content by default', () => {
        render(
            <Tooltip>
                <TooltipTrigger><Text>Hover me</Text></TooltipTrigger>
                <TooltipContent><Text>Tip text</Text></TooltipContent>
            </Tooltip>,
        );
        expect(screen.queryByText('Tip text')).toBeNull();
    });

    it('shows content when defaultOpen is true', () => {
        render(
            <Tooltip defaultOpen>
                <TooltipTrigger><Text>Hover me</Text></TooltipTrigger>
                <TooltipContent><Text>Tip text</Text></TooltipContent>
            </Tooltip>,
        );
        expect(screen.getByText('Tip text')).toBeTruthy();
    });

    it('shows content on long press', () => {
        render(
            <Tooltip>
                <TooltipTrigger><Text>Hover me</Text></TooltipTrigger>
                <TooltipContent><Text>Tip text</Text></TooltipContent>
            </Tooltip>,
        );
        fireEvent(screen.getByText('Hover me'), 'longPress');
        expect(screen.getByText('Tip text')).toBeTruthy();
    });

    it('calls onOpenChange when toggled', () => {
        const onOpenChange = vi.fn();
        render(
            <Tooltip onOpenChange={onOpenChange}>
                <TooltipTrigger><Text>Hover me</Text></TooltipTrigger>
                <TooltipContent><Text>Tip text</Text></TooltipContent>
            </Tooltip>,
        );
        fireEvent(screen.getByText('Hover me'), 'longPress');
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('renders string content directly', () => {
        render(
            <Tooltip defaultOpen>
                <TooltipTrigger><Text>Hover me</Text></TooltipTrigger>
                <TooltipContent>Simple tip</TooltipContent>
            </Tooltip>,
        );
        expect(screen.getByText('Simple tip')).toBeTruthy();
    });

    it('has correct accessibility attributes on trigger', () => {
        render(
            <Tooltip>
                <TooltipTrigger accessibilityLabel="More info"><Text>?</Text></TooltipTrigger>
                <TooltipContent><Text>Tip</Text></TooltipContent>
            </Tooltip>,
        );
        expect(screen.getByLabelText('More info')).toBeTruthy();
    });
});
