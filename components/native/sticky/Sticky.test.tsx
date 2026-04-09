import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Sticky } from './Sticky';
import { Text } from 'react-native';

describe('Sticky (Native)', () => {
  it('renders children', () => {
    render(<Sticky><Text>Sticky Content</Text></Sticky>);
    expect(screen.getByText('Sticky Content')).toBeTruthy();
  });
});
