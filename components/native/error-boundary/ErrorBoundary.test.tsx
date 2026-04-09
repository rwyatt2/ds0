import { render } from '@testing-library/react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { Text } from 'react-native';
describe('ErrorBoundary (Native)', () => { it('renders children', () => { const { getByText } = render(<ErrorBoundary><Text>OK</Text></ErrorBoundary>); expect(getByText('OK')).toBeTruthy(); }); });
