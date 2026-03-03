import { useControllable } from '../utils/useControllable';
import type { UseTabsProps, UseTabsReturn } from './Tabs.types';

/**
 * Hook that encapsulates Tabs behavior.
 * Manages active tab state (controlled/uncontrolled), orientation, and activation mode.
 *
 * @param props - Configuration options
 * @returns Active value, setter, orientation, and activation mode
 *
 * @example
 * ```ts
 * const tabs = useTabs({ defaultValue: 'tab1' });
 * ```
 */
export function useTabs(props: UseTabsProps): UseTabsReturn {
    const {
        value,
        defaultValue = '',
        onValueChange,
        orientation = 'horizontal',
        activationMode = 'automatic',
    } = props;

    const { value: activeValue, setValue: setActiveValue } = useControllable({
        value,
        defaultValue,
        onChange: onValueChange,
    });

    return {
        activeValue,
        setActiveValue,
        orientation,
        activationMode,
    };
}
