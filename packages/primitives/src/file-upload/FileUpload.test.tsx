import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FileUploadPrimitive } from './FileUpload';
expect.extend(toHaveNoViolations);
describe('FileUploadPrimitive', () => {
    it('renders', () => { render(<FileUploadPrimitive>Drop files</FileUploadPrimitive>); expect(screen.getByText('Drop files')).toBeInTheDocument(); });
    it('has button role', () => { render(<FileUploadPrimitive />); expect(screen.getByRole('button')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<FileUploadPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<FileUploadPrimitive ref={ref} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
