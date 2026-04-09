import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { EmptyState } from './EmptyState';

describe('EmptyState (Native)', () => {
  it('renders with title', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText('No items')).toBeTruthy();
  });

  it('renders description', () => {
    render(<EmptyState title="No items" description="Add your first item." />);
    expect(screen.getByText('Add your first item.')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByLabelText('No items')).toBeTruthy();
  });
});
