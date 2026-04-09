import { render, screen } from '@testing-library/react';
import { ErrorBoundaryPrimitive } from './ErrorBoundary';
const ThrowError = () => { throw new Error('Test error'); };
describe('ErrorBoundaryPrimitive', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    afterAll(() => consoleSpy.mockRestore());
    it('renders children', () => { render(<ErrorBoundaryPrimitive><div>OK</div></ErrorBoundaryPrimitive>); expect(screen.getByText('OK')).toBeInTheDocument(); });
    it('renders fallback on error', () => { render(<ErrorBoundaryPrimitive fallback={<div>Oops</div>}><ThrowError /></ErrorBoundaryPrimitive>); expect(screen.getByText('Oops')).toBeInTheDocument(); });
});
