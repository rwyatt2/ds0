import type { UseDividerProps, UseDividerReturn } from './Divider.types';
export function useDivider(props: UseDividerProps = {}): UseDividerReturn {
    const { orientation = 'horizontal', decorative = true } = props;
    if (decorative) {
        return { dividerProps: { role: 'none' } };
    }
    return { dividerProps: { role: 'separator', 'aria-orientation': orientation } };
}
