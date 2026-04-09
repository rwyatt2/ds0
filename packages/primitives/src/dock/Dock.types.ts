export interface Position { x: number; y: number; }

export interface UseDockProps {
  /** Initial position */
  defaultPosition?: Position;
  /** Controlled position */
  position?: Position;
  /** Position change callback */
  onPositionChange?: (position: Position) => void;
  /** Whether dragging is enabled */
  isDraggable?: boolean;
}

export interface UseDockReturn {
  dockProps: React.HTMLAttributes<HTMLDivElement> & { style: React.CSSProperties };
  handleProps: React.HTMLAttributes<HTMLDivElement>;
  position: Position;
  isDragging: boolean;
}

export interface DockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    UseDockProps {
  children: React.ReactNode;
}

export interface StyledDockProps extends DockProps {
  variant?: 'default' | 'floating' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
