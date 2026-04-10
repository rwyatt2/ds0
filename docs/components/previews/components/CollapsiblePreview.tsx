'use client';

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../../../components/react/collapsible';
import { Stack } from '../../../../components/react/stack';

export function CollapsiblePreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <Collapsible>
                <CollapsibleTrigger>What is DS0?</CollapsibleTrigger>
                <CollapsibleContent>
                    <p className="text-sm text-muted-foreground pt-2">
                        DS0 is an enterprise-grade design system providing 95+ accessible, composable components
                        built with a headless primitive architecture. Each component follows a strict 16-file anatomy
                        and 42-checkpoint quality standard.
                    </p>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible>
                <CollapsibleTrigger>How does theming work?</CollapsibleTrigger>
                <CollapsibleContent>
                    <p className="text-sm text-muted-foreground pt-2">
                        DS0 uses CSS custom properties for theming. Switch between light and dark modes, or create
                        entirely custom themes by overriding the token layer. All components automatically adapt.
                    </p>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible defaultOpen>
                <CollapsibleTrigger>Is this open by default?</CollapsibleTrigger>
                <CollapsibleContent>
                    <p className="text-sm text-muted-foreground pt-2">
                        Yes! This section uses the <code className="text-xs bg-muted px-1 py-0.5 rounded">defaultOpen</code> prop
                        to start in the expanded state.
                    </p>
                </CollapsibleContent>
            </Collapsible>
        </Stack>
    );
}
