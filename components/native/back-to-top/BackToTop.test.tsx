import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { BackToTop } from './BackToTop';

describe('BackToTop (Native)', () => {
  it('renders with default props', () => {
    render(<BackToTop />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(<BackToTop />);
    expect(screen.getByLabelText('Back to top')).toBeTruthy();
  });

  it('handles disabled state', () => {
    render(<BackToTop isDisabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not render when not visible', () => {
    render(<BackToTop isVisible={false} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
