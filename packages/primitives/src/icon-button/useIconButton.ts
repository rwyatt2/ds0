import { useButton } from '../button/useButton';
import type { UseIconButtonProps, UseIconButtonReturn } from './IconButton.types';

/**
 * Hook that encapsulates IconButton behavior.
 * Delegates to useButton since behavior is identical.
 */
export function useIconButton(props: UseIconButtonProps = {}): UseIconButtonReturn {
    const { isDisabled, isLoading, onClick, onKeyDown, onKeyUp } = props;
    const { buttonProps } = useButton({ isDisabled, isLoading, onClick, onKeyDown, onKeyUp });
    return { buttonProps };
}
