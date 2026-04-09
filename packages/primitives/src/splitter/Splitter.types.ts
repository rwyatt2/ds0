/**
 * Props for the useSplitter hook.
 */
export interface UseSplitterProps {
  /** Split direction */
  direction?: 'horizontal' | 'vertical';
  /** Whether resizing is disabled */
  isDisabled?: boolean;
}

export interface UseSplitterReturn {
  groupProps: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Props for the SplitterGroup.
 */
export interface SplitterGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    UseSplitterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Props for the SplitterPanel.
 */
export interface SplitterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial size as percentage */
  defaultSize?: number;
  /** Minimum size as percentage */
  minSize?: number;
  /** Maximum size as percentage */
  maxSize?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Props for the SplitterHandle.
 */
export interface SplitterHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether this handle is disabled */
  isDisabled?: boolean;
  className?: string;
}

export type StyledSplitterGroupProps = SplitterGroupProps;
export type StyledSplitterPanelProps = SplitterPanelProps;
export type StyledSplitterHandleProps = SplitterHandleProps;
