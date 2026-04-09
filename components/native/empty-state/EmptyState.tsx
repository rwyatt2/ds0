import React, { forwardRef } from 'react';
import { View, Text, type ViewProps, StyleSheet } from 'react-native';

/**
 * React Native EmptyState component.
 * Displays a placeholder when a view has no content.
 *
 * @example
 * ```tsx
 * <EmptyState title="No items" description="Add your first item." />
 * ```
 */

interface EmptyStateNativeProps extends ViewProps {
  /** Empty state headline */
  title: string;
  /** Explanatory text */
  description?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** CTA element */
  action?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 280,
  },
  action: {
    marginTop: 8,
  },
});

const EmptyState = forwardRef<View, EmptyStateNativeProps>(
  ({ title, description, icon, action, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        accessibilityRole="summary"
        accessibilityLabel={title}
        {...props}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {action && <View style={styles.action}>{action}</View>}
      </View>
    );
  },
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
export type { EmptyStateNativeProps };
