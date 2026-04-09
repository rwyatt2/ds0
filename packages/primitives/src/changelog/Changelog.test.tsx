import { render, screen } from '@testing-library/react';
import { ChangelogPrimitive } from './Changelog';
describe('ChangelogPrimitive', () => { it('renders', () => { render(<ChangelogPrimitive entries={[{ id: '1', version: '1.0', date: '2024-01', title: 'Init', type: 'feature' }]} />); expect(screen.getByRole('feed')).toBeInTheDocument(); }); });
