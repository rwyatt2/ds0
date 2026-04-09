import { render, screen } from '@testing-library/react-native';
import { CodeBlock } from './CodeBlock';
describe('CodeBlock (Native)', () => { it('renders code', () => { render(<CodeBlock code="const x = 1;" />); expect(screen.getByText(/const x = 1/)).toBeTruthy(); }); });
