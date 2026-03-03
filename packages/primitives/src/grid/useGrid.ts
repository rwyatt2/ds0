import type { UseGridProps, UseGridReturn } from './Grid.types';
export function useGrid(props: UseGridProps = {}): UseGridReturn {
    return { Element: props.as ?? 'div' };
}
