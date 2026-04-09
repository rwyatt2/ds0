import React, { forwardRef, useState, useCallback } from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    type ViewProps,
} from 'react-native';

/**
 * Props for the React Native Collapsible component.
 */
interface NativeCollapsibleProps extends ViewProps {
    /** Controlled open state */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Callback when state changes */
    onOpenChange?: (open: boolean) => void;
    /** Content */
    children: React.ReactNode;
}

/**
 * React Native Collapsible component.
 * Simple expand/collapse container.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <Collapsible.Trigger>
 *     <Text>Toggle</Text>
 *   </Collapsible.Trigger>
 *   <Collapsible.Content>
 *     <Text>Hidden content</Text>
 *   </Collapsible.Content>
 * </Collapsible>
 * ```
 */
const Collapsible = forwardRef<View, NativeCollapsibleProps>(
    (
        {
            open: controlledOpen,
            defaultOpen = false,
            onOpenChange,
            children,
            ...rest
        },
        ref,
    ) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const isOpen = controlledOpen ?? internalOpen;

        const toggle = useCallback(() => {
            const next = !isOpen;
            setInternalOpen(next);
            onOpenChange?.(next);
        }, [isOpen, onOpenChange]);

        return (
            <View ref={ref} {...rest}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                            _isOpen: isOpen,
                            _toggle: toggle,
                        });
                    }
                    return child;
                })}
            </View>
        );
    },
);

Collapsible.displayName = 'Collapsible';

interface TriggerProps {
    _isOpen?: boolean;
    _toggle?: () => void;
    children: React.ReactNode;
}

const CollapsibleTrigger = ({ _toggle, children }: TriggerProps): React.ReactElement => (
    <Pressable
        onPress={_toggle}
        accessibilityRole="button"
        style={styles.trigger}
    >
        {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

interface ContentProps {
    _isOpen?: boolean;
    children: React.ReactNode;
}

const CollapsibleContent = ({ _isOpen, children }: ContentProps): React.ReactElement | null => {
    if (!_isOpen) return null;
    return <View style={styles.content}>{children}</View>;
};

CollapsibleContent.displayName = 'CollapsibleContent';

const styles = StyleSheet.create({
    trigger: {
        paddingVertical: 8,
    },
    content: {
        paddingTop: 4,
    },
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
export type { NativeCollapsibleProps as CollapsibleProps };
