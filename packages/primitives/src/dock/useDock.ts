import { useCallback, useRef, useState } from 'react';
import type { Position, UseDockProps, UseDockReturn } from './Dock.types';

/**
 * Hook that encapsulates Dock dragging behavior.
 * Manages position state and drag event listeners.
 */
export function useDock(props: UseDockProps = {}): UseDockReturn {
  const {
    defaultPosition = { x: 20, y: 20 },
    position: controlledPosition,
    onPositionChange,
    isDraggable = true,
  } = props;

  const [internalPosition, setInternalPosition] = useState<Position>(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const position = controlledPosition ?? internalPosition;

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!isDraggable) return;
      event.preventDefault();
      setIsDragging(true);
      dragOffset.current = { x: event.clientX - position.x, y: event.clientY - position.y };

      const handleMouseMove = (e: MouseEvent) => {
        const newPos = { x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y };
        setInternalPosition(newPos);
        onPositionChange?.(newPos);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [isDraggable, position, onPositionChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isDraggable) return;
      const step = 10;
      let newPos = { ...position };
      switch (event.key) {
        case 'ArrowUp': newPos.y -= step; break;
        case 'ArrowDown': newPos.y += step; break;
        case 'ArrowLeft': newPos.x -= step; break;
        case 'ArrowRight': newPos.x += step; break;
        default: return;
      }
      event.preventDefault();
      setInternalPosition(newPos);
      onPositionChange?.(newPos);
    },
    [isDraggable, position, onPositionChange],
  );

  return {
    dockProps: {
      role: 'dialog',
      'aria-label': 'Dock panel',
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      style: { position: 'fixed', left: position.x, top: position.y, zIndex: 50 },
    },
    handleProps: {
      onMouseDown: handleMouseDown,
      style: { cursor: isDraggable ? 'grab' : 'default' },
      ...({ 'data-dragging': isDragging || undefined } as Record<string, unknown>),
    } as React.HTMLAttributes<HTMLDivElement>,
    position,
    isDragging,
  };
}
