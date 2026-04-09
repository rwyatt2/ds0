import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CodeBlock } from './CodeBlock';
expect.extend(toHaveNoViolations);

describe('CodeBlock (Styled)', () => {
    it('renders code', () => { render(<CodeBlock code="const x = 1;" />); expect(screen.getByText(/const x = 1/)).toBeInTheDocument(); });
    it('renders title', () => { render(<CodeBlock code="x" title="test.ts" />); expect(screen.getByText('test.ts')).toBeInTheDocument(); });
    it('renders copy button', () => { render(<CodeBlock code="x" />); expect(screen.getByLabelText('Copy code')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<CodeBlock code="x" />); expect(await axe(container)).toHaveNoViolations(); });
});
