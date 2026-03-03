import type { UseSpinnerProps, UseSpinnerReturn } from './Spinner.types';
export function useSpinner(props: UseSpinnerProps = {}): UseSpinnerReturn {
    const { label = 'Loading' } = props;
    return { spinnerProps: { role: 'status', 'aria-label': label } };
}
