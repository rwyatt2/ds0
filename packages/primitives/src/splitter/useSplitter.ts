import { useCallback, useRef, useState } from 'react';

import type { UseSplitterProps, UseSplitterReturn } from './Splitter.types';

/**
 * Hook that encapsulates Splitter group behavior.
 *
 * @example
 * ```tsx
 * const { groupProps } = useSplitter({ direction: 'horizontal' });
 * ```
 */
export function useSplitter(props: UseSplitterProps = {}): UseSplitterReturn {
  const { direction = 'horizontal', isDisabled = false } = props;

  return {
    groupProps: {
      role: 'group',
      'data-direction': direction,
      'aria-orientation': direction === 'horizontal' ? 'horizontal' : 'vertical',
      ...({ 'data-disabled': isDisabled || undefined } as Record<string, unknown>),
    } as React.HTMLAttributes<HTMLDivElement>,
  };
}

/**
 * Hook for splitter handle drag behavior.
 */
export function useSplitterHandle(options: {
  direction: 'horizontal' | 'vertical';
  isDisabled?: boolean;
  onResize?: (delta: number) => void;
}) {
  const { direction, isDisabled = false, onResize } = options;
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef(0);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) return;
      event.preventDefault();
      setIsDragging(true);
      startPos.current = direction === 'horizontal' ? event.clientX : event.clientY;

      const handleMouseMove = (e: MouseEvent) => {
        const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
        const delta = currentPos - startPos.current;
        startPos.current = currentPos;
        onResize?.(delta);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [direction, isDisabled, onResize],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isDisabled) return;
      const step = 10;
      let delta = 0;
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          delta = -step;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          delta = step;
          break;
        case 'Home':
          delta = -1000;
          break;
        case 'End':
          delta = 1000;
          break;
        default:
          return;
      }
      event.preventDefault();
      onResize?.(delta);
    },
    [isDisabled, onResize],
  );

  return {
    handleProps: {
      role: 'separator' as const,
      'aria-orientation': direction === 'horizontal' ? ('vertical' as const) : ('horizontal' as const),
      tabIndex: isDisabled ? -1 : 0,
      'aria-disabled': isDisabled || undefined,
      onMouseDown: handleMouseDown,
      onKeyDown: handleKeyDown,
      'data-dragging': isDragging || undefined,
    },
    isDragging,
  };
}
