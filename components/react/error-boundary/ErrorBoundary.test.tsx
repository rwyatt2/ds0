import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
describe('ErrorBoundary (Styled)', () => { it('renders children', () => { render(<ErrorBoundary><div>OK</div></ErrorBoundary>); expect(screen.getByText('OK')).toBeInTheDocument(); }); });
