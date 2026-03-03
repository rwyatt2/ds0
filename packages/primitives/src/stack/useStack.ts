import type { UseStackProps, UseStackReturn } from './Stack.types';
export function useStack(props: UseStackProps = {}): UseStackReturn {
    return { Element: props.as ?? 'div' };
}
