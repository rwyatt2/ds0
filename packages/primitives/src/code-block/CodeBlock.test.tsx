import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CodeBlockPrimitive } from './CodeBlock';
expect.extend(toHaveNoViolations);

describe('CodeBlockPrimitive', () => {
    const sampleCode = 'const x = 1;\nconsole.log(x);';
    it('renders code content', () => { render(<CodeBlockPrimitive code={sampleCode} />); expect(screen.getByText(/const x = 1/)).toBeInTheDocument(); });
    it('renders with language aria-label', () => { render(<CodeBlockPrimitive code={sampleCode} language="javascript" />); expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Code block: javascript'); });
    it('renders copy button', () => { render(<CodeBlockPrimitive code={sampleCode} />); expect(screen.getByLabelText('Copy code')).toBeInTheDocument(); });
    it('renders title when provided', () => { render(<CodeBlockPrimitive code={sampleCode} title="example.ts" />); expect(screen.getByText('example.ts')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<CodeBlockPrimitive code={sampleCode} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<CodeBlockPrimitive ref={ref} code="" />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
