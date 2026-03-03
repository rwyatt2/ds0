import type { UseContainerProps, UseContainerReturn } from './Container.types';
export function useContainer(props: UseContainerProps = {}): UseContainerReturn {
    return { Element: props.as ?? 'div' };
}
