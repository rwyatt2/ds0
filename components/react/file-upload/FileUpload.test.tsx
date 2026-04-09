import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FileUpload } from './FileUpload';
expect.extend(toHaveNoViolations);
describe('FileUpload (Styled)', () => {
    it('renders dropzone', () => { render(<FileUpload />); expect(screen.getByText(/Drag & drop/)).toBeInTheDocument(); });
    it('renders button variant', () => { render(<FileUpload variant="button" />); expect(screen.getByRole('button')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<FileUpload />); expect(await axe(container)).toHaveNoViolations(); });
});
