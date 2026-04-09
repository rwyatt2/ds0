import { render, screen } from '@testing-library/react-native';

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';

describe('Collapsible (Native)', () => {
    it('renders trigger', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>,
        );
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('hides content by default', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>,
        );
        expect(screen.queryByText('Content')).toBeNull();
    });

    it('shows content when defaultOpen', () => {
        render(
            <Collapsible defaultOpen>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>,
        );
        expect(screen.getByText('Content')).toBeTruthy();
    });
});
